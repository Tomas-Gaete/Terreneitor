import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { logger } from "@/logger";

// * This will show the title and description of the page.
export const metadata = {
	title: "Terreneitor",
	description: "EL COCHE MAS PODEROSO QUE HA EXISTIDO",
}; 
logger.debug(`cheking metadata => title: (${metadata.title ? metadata.title : 'x'}) description: (${metadata.description ? metadata.description : 'x'}). Metadata loaded successfully.`);




// * This function initializes the translations for the page, setting the locale and the namespaces.

export default async function RootLayout({ children}) {
	return (
		<html >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <body>
                    {children}
                </body>
            </ThemeProvider>
		</html>
	);
}
