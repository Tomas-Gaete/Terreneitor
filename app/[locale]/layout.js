import "../globals.css";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import initTranslations from "../i18n";
import TranslationsProvider from "@components/TranslationsProvider";


// * This will show the title and description of the page.
export const metadata = {
	title: "Terreneitor",
	description: "EL COCHE MAS PODEROSO QUE HA EXISTIDO",
};

// * This function generates the static parameters for the page. this will be used to have the page in multiple languages.
export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}

const i18nNamespaces = ["common", "errors", "translate-login", "translate-register", "translate-dashboard", "landing"];

// * This function initializes the translations for the page, setting the locale and the namespaces.

export default async function RootLayout({ children, params: { locale } }) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<html lang={locale} dir={dir(locale)}>
			<TranslationsProvider
				namespaces={i18nNamespaces}
				locale={locale}
				resources={resources}
			>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<body>
                        {children}
                    </body>
				</ThemeProvider>
			</TranslationsProvider> 
		</html>
	);
}
