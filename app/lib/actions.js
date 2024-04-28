"use server";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
// * This function authenticates the user with the email and password provided.
export async function authenticate(prevState, formData) {
	try {
		const cookiesHeaders = cookies();
		const locale = cookiesHeaders.get("NEXT_LOCALE").value;
		await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			redirectTo: `/${locale}/dashboard`,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.cause.err.message) {
				case "genericError":
					//generic Error
					return "genericError";

				case "credentialsDontMatch":
					// Credentials dont match with the user
					return "credentialsDontMatch";

				case "invalidCredentials":
					// Credentials are invalid. ie: email or password is not valid
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

