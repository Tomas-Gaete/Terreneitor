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
    let num;

	try {
		const result = await sql`WITH community_id_query AS (
    SELECT community_id
    FROM user_info
    WHERE email = ${session.user.email})
    SELECT ui.id,
       ui.firstname,
       ui.lastname,
       r.id as residence_id,
       r.community_address,
       res.cellphone
       FROM user_info ui
       JOIN resident res ON ui.id = res.user_id
       JOIN residence r ON res.residence_id = r.id
       JOIN community_id_query cq ON ui.community_id = cq.community_id;
      `;
      const number = await sql`SELECT cellphone FROM resident WHERE user_id = 41;`;
      num = number.rows[0].cellphone;
      
      names = result.rows.map(row => ({
        id: row.id,
        label: `${row.firstname} ${row.lastname}`,
        address:  `${row.community_address}`,
        residence_id: `${row.residence_id}`,
        cellphone: `${row.cellphone}`
        
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

