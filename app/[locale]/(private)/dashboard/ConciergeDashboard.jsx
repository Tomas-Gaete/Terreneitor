import ConciergeDashboardComp from "@/app/components/ConciergeDashboardComp";
import { logger } from "@/logger";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@vercel/postgres";

/*
 * This is the page the user sees upon logging in. This dashboard will be private, meaning it will only be visible once logged in with email and password.
 */
export default async function ConciergeDashboard() {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}

	const client = await db.connect();

	let pendingPackages;
	let parkingOccupancy;
	let overdueParking;
	let latestVisitors;

	try {
		pendingPackages = await client.sql`
        SELECT
            p.id,
            sender, 
            recipient,
            TO_CHAR(drop_off, 'YYYY-mm-DD') AS drop_off,
            community_address
        FROM 
            package p
        INNER JOIN 
            residence r ON r.id = p.residence_id
        WHERE 
            pick_up IS NULL 
            AND r.community_id = ${session.user.community_id};`;

		parkingOccupancy = await client.sql`
        WITH total_spaces AS (
            SELECT COUNT(*) as total_spaces
            FROM parking_space
            where community_id = ${session.user.community_id})
        SELECT 
            count(psu.id)/(SELECT total_spaces FROM total_spaces)*100 AS usage_percentaje
        FROM 
            parking_space_usage psu
        INNER JOIN
            visit_to_residence vtr ON vtr.id = psu.visit_id
        INNER JOIN 
            parking_space ps ON ps.id = psu.parking_space_id
        WHERE 
            vtr.departure IS null;`;
		overdueParking = await client.sql`
        SELECT
            count(psu.id) AS overdue
        FROM
            parking_space_usage psu
        INNER JOIN 
            visit_to_residence vtr ON vtr.id = psu.visit_id
        INNER JOIN 
            parking_space ps ON ps.id = psu.parking_space_id
        WHERE 
            vtr.departure is null 
            AND NOW() - vtr.arrival > (
                SELECT 
                    CAST(value AS INTERVAL) 
                FROM
                    config 
                WHERE 
                    name = 'max_park_time' 
                    AND  community_id = ${session.user.community_id})`;

		latestVisitors = await client.sql`
        SELECT
            vtr.id,
            CONCAT(v.firstname,' ', v.lastname) AS name,
            TO_CHAR(vtr.arrival,'YYYY-MM-DD HH24:MM:SS') arrival_time,
            r.community_address
        FROM 
            visit_to_residence vtr
        INNER JOIN
            visitor v on v.id = vtr.visitor_id
        INNER JOIN
            residence r on r.id = vtr.residence_id
        WHERE 
            vtr.departure IS NULL 
            AND vtr.arrival > NOW() - INTERVAL '1 day'
        ORDER BY 
            arrival_time DESC
        LIMIT 10;`;

		pendingPackages = pendingPackages.rows;
		parkingOccupancy = parkingOccupancy.rows[0].usage_percentaje;
		overdueParking = overdueParking.rows[0].overdue;
		latestVisitors = latestVisitors.rows;
	} catch (err) {
		logger.error("Failed to get data for the dashboard", err);
	} finally {
		client.release();
	}
	logger.info(
		`User with email '${session?.user?.email}' has opened the dashboard.`,
	);
	
	return (
		<ConciergeDashboardComp
			pendingPackages={pendingPackages}
			parkingOccupancy={parkingOccupancy}
			overdueParking={overdueParking}
			latestVisitors={latestVisitors}
		/>
	);
}
