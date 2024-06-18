"use client";
import { darkTheme } from "@/theme";
import { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const ThemeContext = createContext(darkTheme);

export default function MyThemeProvider({ children }) {
	const [theme, setTheme] = useState(darkTheme);

	return (
		<>
			<ThemeContext.Provider
				value={{
					theme,
					setTheme
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
