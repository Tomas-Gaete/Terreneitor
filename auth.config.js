import { sql } from "@vercel/postgres";

// * This is the configuration for the authentication of the app. It will redirect the user to the login page if they are not logged in.
export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
            //TODO: see if we need this
			return true;
		},
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            try {
                const storedUser = await sql`SELECT role.name, user_info.id, community_id FROM user_info 
                JOIN role ON user_info.role_id = role.id 
                WHERE email = ${session.user.email}`     
                session.user.role = storedUser.rows[0].name
                session.user.id = storedUser.rows[0].id
                session.user.community_id = storedUser.rows[0].community_id
            } catch (err) {
                throw new Error("Failed to get user role. Something went wrong :(")
            }
            return session
        },
	},
	providers: [], // Add providers with an empty array for now
}
