"use server";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
import { logger } from "@/logger";
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
                    logger.error(`User with email '${formData.get("email")}' tried to log in with wrong credentials.`);
					// Credentials dont match with the user
					return "credentialsDontMatch";

				case "invalidCredentials":
					// Credentials are invalid. ie: email or password is not valid
					logger.error(`An account with email: '${formData.get("email")}' doesn't exist or the password '${formData.get("password")}'is wrong.`)
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



//TODO: remove this function
export async function getVisitors() {
	const session = await auth();
	if (!session?.user || !session?.user?.email) return null;

    const visitors = await sql`WITH community_id_query AS (
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
    const visitorsRut = visitors.rows.map((visitor) => ({label: visitor.rut, id: visitor.id}));
    const visitorsName = visitors.rows.map((visitor) => ({label: visitor.name, id: visitor.id}));
    
    return {visitorsRut, visitorsName};


}


export async function thenewUser(data) {
	const bcrypt = require("bcryptjs")
  
	const email = data.get("email");
	const ps = data.get("password");
	const firstname = data.get("firstName");
	const lastname = data.get("lastName");
	const rondasdesal = 10;
	const roleid = 5;
	const community_id = 1;
	const hasaccount = true;
	const password = await bcrypt.hash(ps,rondasdesal);
	
	const dbemail = await sql`SELECT COUNT(*) FROM user_info WHERE email = ${email}`;
	console.log(email);
	console.log(dbemail.rows);
	console.log(dbemail.rows[0].count)
	if (dbemail.rows[0].count > 0) {
		return true;	
	}else{
		try {
			console.log("Creating user...");
			await sql`INSERT INTO user_info (role_id,community_id,firstname,lastname,has_account,email,password)
			 VALUES (${roleid},${community_id},${firstname},${lastname},${hasaccount},${email},${password});`;
		} catch (error) {
			return console.log({
				error: "User not created",
				message: error.message,
				email: email,
				password: password,
				firstname: firstname,
				lastname: lastname,
	  
	  
			
			});
		  }
		  console.log("User created successfully!");
		  await authenticate(null, data);
	}
	}
