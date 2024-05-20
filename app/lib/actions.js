"use server";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
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

/**
 * POST

/login
500

TypeError: Cannot read properties of undefined (reading 'value')
    at l (/var/task/.next/server/chunks/504.js:1:6242)
    at s (/var/task/.next/server/chunks/504.js:1:1240)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async /var/task/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:16:406
    at async rm (/var/task/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:15:6342)
    at async rq (/var/task/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:18:1249)
    at async Y (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:16:25520)
    at async Q.responseCache.get.routeKind (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:1025)
    at async r2.renderToResponseWithComponentsImpl (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:507)
    at async r2.renderPageComponent (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:4784)

 */