import { sql } from "@vercel/postgres";

import {Parking_Component} from "./parkingcomponent"; // Correct the import


export default async function Parking() {
	let db_parking_space;

	try {
    db_parking_space= await sql`SELECT * FROM parking_space`
    db_parking_space = db_parking_space.rows;
		
	} catch (error) {
		db_parking_space = [];

	}
  

  
  return (
    

    <div>
      
      
    

    <Parking_Component/>
    </div>
  );

};
