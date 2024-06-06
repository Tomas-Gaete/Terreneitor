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
	logger.debug(`Received data: ${email}, ${firstname}, ${lastname}, ${password}, ${roleid}, ${community_id}, ${hasaccount}`);	
	const dbemail = await sql`SELECT COUNT(*) FROM user_info WHERE email = ${email}`;

	if (dbemail.rows[0].count > 0) {
		logger.info(`User with email:'${email}' tried creating a new user again.`);

		return true;	
	}else{
		try {
			await sql`INSERT INTO user_info (role_id,community_id,firstname,lastname,has_account,email,password)
			 VALUES (${roleid},${community_id},${firstname},${lastname},${hasaccount},${email},${password});`;
		} catch (error) {
			




			return 	logger.error(`following error:'${error.message}' has occurred while creating a new user.`);

		  }
		logger.info(`New user has been created with the email:'${email}'.`);

		await authenticate(null, data);
	}
	}
