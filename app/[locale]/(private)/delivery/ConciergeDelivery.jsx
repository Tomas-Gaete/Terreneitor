import { logger } from "@/logger"
import { auth } from "@/auth";
import { Deliverycomponent } from "@components/deliver_component";
import { sql } from '@vercel/postgres';
/*
    * This is the page the user sees upon logging in. This dashboard will be private, meaning it will only be visible once logged in with email and password.
*/

export default async function ConciergeDelivery (){
    const session =  await auth();
    if (!session?.user || !session?.user?.email) return null;

    let names;

	try {
		const result = await sql`WITH community_id_query AS (
            SELECT community_id
            FROM user_info
            WHERE email = ${session.user.email}
        )
       SELECT id,
       firstname,
       lastname
       FROM user_info
       WHERE id IN (SELECT user_id FROM resident)
  AND community_id = (SELECT community_id FROM community_id_query);
      `;
      names = result.rows.map(row => ({
        id: row.id,
        label: `${row.firstname} ${row.lastname}`
    }));
    } catch (error) {
        console.error("Error loading names:", error);
        names = [];
	}
    
    return ( 
        <div>
            <Deliverycomponent
            residentName={names}/>
        </div>
    );
};

