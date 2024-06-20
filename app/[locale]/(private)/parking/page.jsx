import { sql } from "@vercel/postgres";
import { auth } from "@/auth";
import { logger } from "@/logger";

import { Parking_Component } from "./parkingcomponent"; // Correct the import

export default async function Parking() {
	const session = await auth();

	let user_community_id;
	let parking_DB;
	let db_parking_space;
	let db_parking_space_usage;
	let ocupied_spaces;

	//firt, find the community id of the user
	try {
		user_community_id =
			await sql`SELECT community_id FROM user_info WHERE email = ${session?.user?.email}`;
		user_community_id = user_community_id.rows[0].community_id;
	} catch (error) {
		user_community_id = [];
	}
	//then, make a database of all the parking spaces from the community of the user
	try {
		parking_DB =
			await sql`SELECT parking_space.id, parking_space.number, visitor_vehicle.brand, visitor_vehicle.model, visitor.firstname, visitor.lastname, user_info.firstname as resident_firstname, user_info.lastname as resident_lastname
                             FROM parking_space 
                            LEFT JOIN parking_space_usage ON parking_space.id = parking_space_usage.parking_space_id 
                            LEFT JOIN visitor_vehicle ON parking_space_usage.vehicle_id = visitor_vehicle.id 
                            LEFT JOIN visitor ON parking_space_usage.visitor_id = visitor.id
                            LEFT JOIN visit_to_residence ON parking_space_usage.visit_id = visit_to_residence.id
                            LEFT JOIN residence ON visit_to_residence.residence_id = residence.id
                            LEFT JOIN resident ON residence.id = resident.residence_id
                            LEFT JOIN user_info ON resident.user_id = user_info.id

                            WHERE parking_space.community_id = ${user_community_id}`;
		parking_DB = parking_DB.rows;
	} catch (error) {
		user_community_id = [];
	}

	try {
		db_parking_space = await sql`SELECT * FROM visitor`;
		db_parking_space = db_parking_space.rows;
	} catch (error) {
		db_parking_space = [];
	}
	try {
		db_parking_space_usage = await sql`SELECT * FROM parking_space_usage`;
		db_parking_space_usage = db_parking_space_usage.rows;
	} catch (error) {
		db_parking_space_usage = [];
	}

	try {
		ocupied_spaces =
			await sql`SELECT * FROM parking_space_usage INNER JOIN parking_space ON parking_space_usage.parking_space_id = parking_space.id WHERE community_id = ${user_community_id}`;
		ocupied_spaces = ocupied_spaces.rows.length;
	} catch (error) {
		ocupied_spaces = [];
	}

	logger.info(
		`User with community_id '${user_community_id}' has opened the parking page.`,
	);

	return (
		<div>
			<Parking_Component
				db_parking_space={db_parking_space}
				db_parking_space_usage={db_parking_space_usage}
				ocupied_spaces={ocupied_spaces}
				parking_DB={parking_DB}
			/>
		</div>
	);
}
