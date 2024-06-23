"use server";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
import { logger } from "@/logger";


function validateRut(rut) {
	// Despejar puntos y guion
	var valor = rut.replace(/\./g, "").replace("-", "");

	// Separar RUT y dígito verificador
	var cuerpo = valor.slice(0, -1);
	var digitoVerificador = valor.slice(-1).toUpperCase();

	// Validar que el RUT contiene solo números
	if (!/^\d+$/.test(cuerpo)) {
		return false;
	}

	// Calcular dígito verificador
	const arrRut = cuerpo.split("").reverse();
	let sum = 0;
	let multiplo = 2;

	for (let i = 0; i < arrRut.length; i++) {
		sum += parseInt(arrRut[i]) * multiplo;
		multiplo = multiplo < 7 ? multiplo + 1 : 2;
	}

	const digvCalculado = 11 - (sum % 11);
	let digv;

	if (digvCalculado === 11) {
		digv = "0";
	} else if (digvCalculado === 10) {
		digv = "K";
	} else {
		digv = digvCalculado.toString();
	}

	// Comparar dígito verificador calculado con el ingresado
	return digv === digitoVerificador ? cuerpo + "-" + digv : false;
}

// * This function authenticates the user with the email and password provided.
export async function authenticate(prevState, formData) {
	try {
		await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			redirectTo: `/dashboard`,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.cause.err.message) {
				case "genericError":
					//generic Error
					return "genericError";

				case "credentialsDontMatch":
					logger.error(
						`User with email '${formData.get("email")}' tried to log in with wrong credentials.`,
					);
					// Credentials dont match with the user
					return "credentialsDontMatch";

				case "invalidCredentials":
					// Credentials are invalid. ie: email or password is not valid
					logger.error(
						`An account with email: '${formData.get("email")}' doesn't exist or the password '${formData.get("password")}'is wrong.`,
					);
					return "invalidCredentials";

				case "userNotFound":
					// User not found
					return "userNotFound";

				default:
					return "genericError";
			}
		}
		throw error;
	}
}

// * This function logs the user out of the app.
export async function LogOut() {
	await signOut({ redirectTo: "/login" });
}

export async function thenewUser(data) {
	const bcrypt = require("bcryptjs");

	const email = data.get("email");
	const ps = data.get("password");
	const firstname = data.get("firstName");
	const lastname = data.get("lastName");
	const rondasdesal = 10;
	const roleid = 5;
	const community_id = 1;
	const hasaccount = true;
	const password = await bcrypt.hash(ps, rondasdesal);
	logger.debug(
		`Received data: ${email}, ${firstname}, ${lastname}, ${password}, ${roleid}, ${community_id}, ${hasaccount}`,
	);
	const dbemail =
		await sql`SELECT COUNT(*) FROM user_info WHERE email = ${email}`;

	if (dbemail.rows[0].count > 0) {
		logger.info(`User with email:'${email}' tried creating a new user again.`);

		return true;
	} else {
		try {
			await sql`INSERT INTO user_info (role_id,community_id,firstname,lastname,has_account,email,password)
			 VALUES (${roleid},${community_id},${firstname},${lastname},${hasaccount},${email},${password});`;
		} catch (error) {
			return logger.error(
				`following error:'${error.message}' has occurred while creating a new user.`,
			);
		}
		logger.info(`New user has been created with the email:'${email}'.`);

		await authenticate(null, data);
	}
}

function send_message(resident) {
    var botId = '337115706152549';
    var phoneNbr = resident.cellphone;
    var phoneNbr = String(phoneNbr);
    var bearerToken = 'EAASfq36BeLUBO6mhZBVbwq7ku2thStJOJZAe30UXtYBZCNQ3rUl8eXojNlK0ADqKvqkfj205qUbJjFjaymz2gP21IwkDPx3KKukYHGcrUierrNyMDoY1Ii3EPB7uoZAMBZA4CG4ZA5VCscsUjvzyBE1WfZAoZAtctGQhaYiUoYEZBahAYZAZBshtDom2TbU9iUBpiwmKH6RfW4RsdVnSw6GXF4ZD';
    var url = 'https://graph.facebook.com/v15.0/' + botId + '/messages';
    var data = {
      messaging_product: 'whatsapp',
      to: phoneNbr,
      type: 'template',
      template: {
        name:'confirmacion',
        language:{ code: 'en_US' }
      }
    };
    
    var postReq = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + bearerToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      json: true
    };
    fetch(url, postReq)
      .then(data => {
        return data.json()
      })
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error));
  }
export async function addPackage(resident, sender, description){
    console.log("holaaaaaaaaaaaaa :)")
    console.log(resident.residence_id);
      console.log(resident.lastname);
      console.log(resident.firstname);
    try{
      console.log("holaaaaaaaaaaaaaee :(")

      console.log(resident.residence_id);
      console.log(resident.lastname);
      console.log(resident.firstname);
    const query = await sql`
INSERT INTO package (residence_id, sender, recipient, description, drop_off, pick_up, picked_up_by)
      VALUES (${resident.residence_id}, ${sender}, ${resident.firstname}, ${description}, NOW(), NULL, NULL)
      RETURNING *;
    `;
      console.log('Insert successful:', query.rows[0]);
    } catch (err) {
      console.error('Error inserting data:', err);
    }
    send_message(resident);
  }
export async function addNewFrequentVisitor(prevState, formData) {
	const session = await auth();
	if (!session?.user || !session?.user?.email) return null;

	let visitor_rut = formData.get("visitor-rut");
	const visitor_firstname = formData.get("visitor-first-name");
	const visitor_lastname = formData.get("visitor-last-name");
	let resident_rut = formData.get("resident-rut");

	if (
		!visitor_rut ||
		!visitor_firstname ||
		!visitor_lastname ||
		!resident_rut
	) {
		return true;
	}
	visitor_rut = validateRut(visitor_rut);
	if (!visitor_rut) return "invalid_rut";
	resident_rut = validateRut(resident_rut);
	if (!resident_rut) return "invalid_rut";

	try {
		console.log("Creando nuevo visitante frecuente");
		const result =
			await sql`SELECT add_frequent_visitor(${visitor_rut},${resident_rut},${visitor_firstname},${visitor_lastname})`;
		if (result.rows[0].add_frequent_visitor === false) {
			return "repeated";
		}
		return false;
	} catch (error) {
		console.log("Error al agregar nuevo visitante frecuente");
		logger.error(`Error adding new visitor: ${error.message}`);
		return true;
	}
}

export async function addVisit(prevState, formData) {
	const residence_id = formData.get("residence_id");
	const visitor_id = formData.get("visitor_id");
	const reason = formData.get("visit_reason");

	//TODO: considerar el estacionamiento dps
	const license_plate = formData.get("license_plate");

	try {
		await sql`INSERT INTO visit_to_residence (residence_id,visitor_id,arrival, departure, reason)
        VALUES (${residence_id}, ${visitor_id},current_timestamp AT TIME ZONE 'America/Santiago', NULL, ${reason})`;
	} catch (error) {
		return "error_adding_visit";
	}
	return "success";
}

export async function addVisitor(prevState, formData) {
	const firstname = formData.get("firstName");
	const lastname = formData.get("lastName");
	let rut = formData.get("rut");
	const community_id = 1;
	//TODO: validate that the visitor doesn't exist and show an error message if it does
	//also consider community id
	//maybe add it to the session

	rut = validateRut(rut);
	if (!rut) return "invalid_rut";

	try {
		await sql`INSERT INTO visitor (rut, community_id, firstname, lastname)
			 VALUES (${rut},${community_id},${firstname}, ${lastname});`;
	} catch (error) {
		return logger.error(
			`following error:'${error.message}' has occurred while creating the new visitor.`,
		);
	}
}

export async function addVisitorVehicle(prevState, formData) {
	const visitor_id = formData.get("visitor_id");
	const license_plate = formData.get("license_plate");
	const brand = formData.get("brand");
	const model = formData.get("model");
	const color = formData.get("color");

	try {
		await sql`INSERT INTO visitor_vehicle (visitor_id, license_plate, brand, model, color)
        VALUES (${visitor_id}, ${license_plate}, ${brand}, ${model}, ${color})`;
	} catch (error) {
		//TODO: add lang
		return "error adding vehicle";
	}
	return false;
}

export async function searchParking() {
	const session = await auth();
	//const user_community_id = session?.user?.community_id; Este seria el ideal, pero hay usuarios que no tienen definido el community_id para el estacionamientod de cada community

	const db_parking_space = await sql`SELECT * FROM parking_space`;
	logger.info(`Total parking spaces: ${db_parking_space.rows.count}`);
	const parking_spaces_list = db_parking_space.rows;

	return parking_spaces_list[0].id;
}

export async function removeFrequentVisitor(prevState, formData) {
	console.log("Eliminando visitante");
	const fv_id = formData.get("frequent_visitor_id");
	console.log(fv_id);
	try {
		await sql`DELETE FROM frequent_visitor where id = ${fv_id}`;
	} catch (error) {
		return "error_removing_visitor";
	}
	return true;
}

export async function updateSettings(prevState, formData) {
	const session = await auth();
	const user_community_id = session?.user?.community_id;
	const duration = formData.get("duration");

	try {
		await sql`UPDATE config SET value = ${duration} WHERE name = 'max_park_time' AND community_id = ${user_community_id}`;
	} catch (error) {
		return "error_updating_settings";
	}
	console.log("Settings updated");
}
