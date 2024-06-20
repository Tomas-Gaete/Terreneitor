import FrequentVisitor from "@/app/components/ResidentFrequentVisitorComp";
import { sql } from "@vercel/postgres";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ResidentFrequentVisitor() {
    const session = await auth();
    if(!session){
        redirect("/login");
    }
	
    let visitors;
    let visitorsRut;
    let residentRut
    
    try{
        visitors = await sql`
            SELECT 
                id,
                rut,
                firstname,
                lastname
            FROM visitor
            WHERE community_id = (SELECT community_id FROM user_info WHERE id = ${session.user.id})
        `;
            
        residentRut = await sql`
            SELECT
                rut
            FROM 
                resident
            WHERE
                id = ${session.user.id}
        `;

        visitorsRut = visitors.rows.map((visitor) => ({
            label: visitor.rut,
            id: visitor.id,
        }));
        visitors = visitors.rows

        residentRut = residentRut.rows[0].rut;

    } catch (error) {
        console.error("Error fetching visitors");
        visitors = [];
    }

    
    return (
		<FrequentVisitor
			visitorsRut={visitorsRut}
			visitors={visitors}
            residentRut={residentRut}
		/>
	);
}
