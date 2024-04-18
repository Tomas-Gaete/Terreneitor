import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
            //TODO: see if we need this
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
                const cookiesHeaders = cookies();
                const locale = cookiesHeaders.get('NEXT_LOCALE').value;
				//return NextResponse.redirect(new URL(`/${locale}/dashboard`, nextUrl));
			}
			return true;
		},
	},
	providers: [], // Add providers with an empty array for now
}