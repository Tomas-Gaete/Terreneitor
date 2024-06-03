import { NextResponse } from "next/server";
import { cookies } from 'next/headers'


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
	},
	providers: [], // Add providers with an empty array for now
}
