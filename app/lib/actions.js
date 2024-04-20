"use server";
import { signIn , signOut} from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";


export async function authenticate(prevState, formData) {
	try {
        const cookiesHeaders = cookies();
        const locale = cookiesHeaders.get('NEXT_LOCALE').value;
		await signIn("credentials", {
			email: formData.get('email'),
			password: formData.get('password'),
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

export async function LogOut() {
    await signOut({ redirectTo: "/login" });
}