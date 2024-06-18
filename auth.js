import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import Google from "next-auth/providers/google"

const bcrypt = require("bcryptjs")

// * This function will get the user from the database by the email.
async function getUser(email) {
    let user;
    try {
        user = await sql`SELECT * FROM user_info WHERE email=${email}`;
    } catch (error) {
        throw new Error('genericError');
    }
    if (user.rowCount === 0) {
        //mayb it should be wrongCredentials
        throw new Error('userNotFound');
    }
    return user.rows[0];
}


// * This function will authenticate the user by email and password.
export const {  handlers:{GET,POST}, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials, request) {
            
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch){
                    return user;
                    //return {...user, name: user.firstname+" "+user.lastname};
                } else {
                    // Credentials dont match
                    throw new Error('credentialsDontMatch');
                }

            } else {
                // Credentials are invalid
                //TODO: add alert to remind the user of the password requirements
                throw new Error('invalidCredentials');
            }
        },
    }),
    Google]
});


