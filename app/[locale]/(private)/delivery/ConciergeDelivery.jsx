import { logger } from "@/logger"
import { auth } from "@/auth";
import { Deliverycomponent } from "@components/deliver_component";

/*
    * This is the page the user sees upon logging in. This dashboard will be private, meaning it will only be visible once logged in with email and password.
*/

export default async function ConciergeDelivery (){
    const session =  await auth();
    if (!session?.user || !session?.user?.email) return null;

    let resident;
	let residentRut;
	let residentName;
    let visitorLicensePlates;
    let alert;
    let residences;

	try {
		visitors = await sql`WITH community_id_query AS (
            SELECT community_id
            FROM user_info
            WHERE email = ${session.user.email}
        )
        SELECT 
            id,
            rut, 
            firstname ||' '|| lastname AS name
        FROM visitor
        WHERE community_id = (SELECT community_id FROM community_id_query)
      `;

		visitorsRut = visitors.rows.map((visitor) => ({
			label: visitor.rut,
			id: visitor.id,
		}));
		visitorsName = visitors.rows.map((visitor) => ({
			label: visitor.name,
			id: visitor.id,
		}));

        residences = await sql`WITH community_id_query AS (
        SELECT community_id
        FROM user_info
        WHERE email = ${session.user.email})
        SELECT
            id,
            community_address
        FROM 
            residence
        WHERE
            community_id = (SELECT community_id FROM community_id_query)
        `;
        residences = residences.rows.map((residence) => ({
            label: residence.community_address,
            id: residence.id
        }));


        visitorLicensePlates = await sql`WITH community_id_query AS (
        SELECT community_id
        FROM user_info
        WHERE email = ${session.user.email})
        SELECT
            vv.id,
            vv.license_plate
        FROM
            visitor_vehicle vv
        JOIN
            visitor v ON v.id = vv.visitor_id
        WHERE
            v.community_id = (SELECT community_id FROM community_id_query)
        `;
        visitorLicensePlates = visitorLicensePlates.rows.map((visitor) => ({
            label: visitor.license_plate,
            id: visitor.id
        }));

	} catch (error) {
       // alert = "Error loading visitors."
		//visitors = [];
		//visitorsRut = [];
		//visitorsName = [];
       // residences = [];
       // visitorLicensePlates = [];
	}
    //  Here is a welcome message and a logout button displayed.
    return ( 
        <div>
            <Deliverycomponent />
        </div>
    );
};

