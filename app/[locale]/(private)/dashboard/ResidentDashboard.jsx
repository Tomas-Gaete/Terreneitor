import ResidentDashboardComp from "@components/ResidentDashboardComp";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@vercel/postgres";

export default async function ResidentDashboard() {
	const session = await auth();
	if (!session) {
		redirect("/login");
	}

	const client = await db.connect();

	let pendingPackages;
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
                AND r.id = (SELECT residence_id FROM resident WHERE id = ${session.user.id});`;

		latestVisitors = await client.sql`
            SELECT
                vtr.id,
                CONCAT(v.firstname,' ', v.lastname) AS name,
                TO_CHAR(vtr.arrival,'YYYY-MM-DD HH24:MM:SS') arrival_time,
                TO_CHAR(vtr.arrival,'YYYY-MM-DD') date,
                TO_CHAR(vtr.arrival,'HH24:MM:SS') time
            FROM 
                visit_to_residence vtr
            INNER JOIN
                visitor v on v.id = vtr.visitor_id
            INNER JOIN
                residence r on r.id = vtr.residence_id
            WHERE 
                r.id = (SELECT residence_id FROM resident WHERE id = ${session.user.id})
            ORDER BY 
                arrival_time DESC
            LIMIT 10;`;

		pendingPackages = pendingPackages.rows;
		latestVisitors = latestVisitors.rows;
	} catch (error) {
		pendingPackages = [];
		latestVisitors = [];
		console.error(error);
	} finally {
		client.release();
	}

	return (
		<ResidentDashboardComp
			pendingPackages={pendingPackages}
			latestVisitors={latestVisitors}
		/>
	);
}
