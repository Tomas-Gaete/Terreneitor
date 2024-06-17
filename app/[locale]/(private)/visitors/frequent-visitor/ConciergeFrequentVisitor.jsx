import FrequentVisitor from "@components/FrequentVisitorForm";
import { sql } from "@vercel/postgres";
import { auth } from "@/auth";

export default async function ConciergeFrequentVisitor() {
	const session = await auth();
	if (!session?.user || !session?.user?.email) return null;
	let visitors;
	let residents;
	let rut;
    let residentRut;

	try {
		visitors = await sql`WITH community_id_query AS (
        SELECT community_id
        FROM user_info
        WHERE email = ${session.user.email}
        )
        SELECT 
            id,
            rut,
            firstname,
            lastname
        FROM visitor
        WHERE community_id = (SELECT community_id FROM community_id_query)
        `;
		residents = await sql`WITH community_id_query 
        AS (SELECT community_id FROM user_info
            WHERE email = ${session.user.email})
        SELECT
            u.id,
            u.firstname,
            u.lastname,
            res.rut,
            r.community_address
        FROM
            resident res
        JOIN
            user_info u ON res.user_id = u.id
        JOIN
            residence r ON res.residence_id = r.id
        JOIN
            community com ON r.community_id = com.id
        WHERE
            com.id = (SELECT community_id FROM community_id_query)`;
        
        residentRut = residents.rows.map((resident) => ({
            label: resident.rut,
            id: resident.id
        }));

		rut = visitors.rows.map((visitor) => ({
			label: visitor.rut,
			id: visitor.id,
		}));
	} catch (error) {residentRut
		alert = "Error fetching visitors";
		visitors = {};
		rut = [];
        residentRut = [];
	}

    //TODO: add check to see if is already a frequent visitor
	return (
		<>
			<FrequentVisitor visitorsRut={rut ?? []} visitors={visitors.rows ?? []} residentRut={residentRut} residents={residents.rows ?? []} />
		</>
	);
}
