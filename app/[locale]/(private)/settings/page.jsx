import Settings from "./Settings";
import { sql } from"@vercel/postgres";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await auth();
	if (!session) {
		redirect("/dashboard");
	}

    let hours;
    try {
        hours = await sql`
        SELECT 
            value
        FROM
            config 
        WHERE 
            name = 'max_park_time' 
            AND  community_id = ${session.user.community_id} `;
            
            hours = hours.rows[0].value
            hours = parseInt(hours.split(" ")[0], 10)
            console.log(hours)
    } catch (error) {
        console.error(error)
    }

    return <Settings db_duration={hours}/>;
}