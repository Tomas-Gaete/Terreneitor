import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { auth } from "./auth";

const locales = ["es", "en"];
const publicPages = ["/", "/login"];

const authMiddleware = auth((req)=>{
    return i18nRouter(req,  i18nConfig);
});

// * This function will check if the page is public or private. If it is public, it will return the i18nRouter function. If it is private, it will return the authMiddleware function.
export default function middleware(req) {

    //TODO: remove this when we are done
    let currentDate = new Date();
    let logDateString = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    console.log(`[${logDateString}] ------- MIDDLEWARE -------`)
    console.log(req.nextUrl.pathname)

	const publicPathnameRegex = RegExp(
		`^(/(${locales.join("|")}))?(${publicPages
			.flatMap((p) => (p === "/" ? ["", "/"] : p))
			.join("|")})/?$`,
		"i",
	);
	const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

	if (isPublicPage) {
        console.log("isPublicPage")
		return i18nRouter(req, i18nConfig);
	} else {
        console.log("isNotPublicPage")
		return authMiddleware(req);
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};