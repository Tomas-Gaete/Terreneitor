"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";


export async function authenticate(prevState, formData) {

	try {
		await signIn("credentials", formData);
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