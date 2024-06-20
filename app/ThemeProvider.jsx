"use client";
import { darkTheme, lightTheme } from "@/theme";
import { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const ThemeContext = createContext(darkTheme);

export default function MyThemeProvider({ children, defaultTheme = null }) {
	let choice;
	if (defaultTheme) {
		choice = defaultTheme === "light" ? lightTheme : darkTheme;
	}
	const [theme, setTheme] = useState(choice ?? darkTheme);

	return (
		<>
			<ThemeContext.Provider
				value={{
					theme,
					setTheme,
				}}
			>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<body>{children}</body>
				</ThemeProvider>
			</ThemeContext.Provider>
		</>
	);
}
