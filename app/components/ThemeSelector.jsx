import { useContext, useState } from "react";
import { darkTheme, lightTheme } from "@/theme";
import { ThemeContext } from "@/app/ThemeProvider";
import { Box, Switch } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeSelector({ noMargin = "auto" }) {
	const { theme, setTheme } = useContext(ThemeContext);
	const [isLight, setIsLight] = useState(theme === lightTheme);

	const toggleTheme = () => {
		//store it in a cookie
		const days = 30;
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = date.toUTCString();
		document.cookie = `theme=${isLight ? "dark" : "light"};expires=${expires};`;
		setTheme(isLight ? darkTheme : lightTheme);
		setIsLight(!isLight);
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				m: noMargin,
			}}
		>
			<LightModeIcon
				color="primary"
				sx={{ visibility: !isLight ? "hidden" : "visible" }}
			/>
			<Switch checked={!isLight} onChange={toggleTheme} />
			<DarkModeIcon sx={{ visibility: isLight ? "hidden" : "visible" }} />
		</Box>
	);
}
