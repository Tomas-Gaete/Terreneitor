import "./globals.css";
import { dir } from "i18next";
import { logger } from "@/logger";
import MyThemeProvider from "./ThemeProvider";

// * This will show the title and description of the page.
export const metadata = {
	title: "Terreneitor",
	description: "EL COCHE MAS PODEROSO QUE HA EXISTIDO",
};

logger.debug(
	`cheking metadata => title: (${metadata.title ? metadata.title : "x"}) description: (${metadata.description ? metadata.description : "x"}). Metadata loaded successfully.`,
);

// * This function initializes the translations for the page, setting the locale and the namespaces.
export default async function RootLayout({ children, params: { locale } }) {
	return (
		<html lang={locale} dir={dir(locale)}>
            <MyThemeProvider>{children}</MyThemeProvider>
		</html>
	);
}
