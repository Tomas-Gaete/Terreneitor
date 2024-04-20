import "../globals.css";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import initTranslations from "../i18n";
import TranslationsProvider from "@components/TranslationsProvider";

export const metadata = {
	title: "Terreneitor",
	description: "EL COCHE MAS PODEROSO QUE HA EXISTIDO",
};

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}

const i18nNamespaces = ["common", "errors"];

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
