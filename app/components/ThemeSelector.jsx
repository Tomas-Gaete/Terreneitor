import { useContext , useState} from "react";
import { darkTheme, lightTheme } from "@/theme";
import { ThemeContext } from "@/app/ThemeProvider";
import { Box, Switch } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


export default function ThemeSelector({noMargin = "auto"}) {

    const { theme, setTheme } = useContext(ThemeContext);
    const [isLight, setIsLight] = useState(theme === lightTheme);

    console.log("isLight", isLight);
    console.log("theme", theme.palette.mode);

    const toggleTheme = () => {
        setTheme(isLight ? darkTheme : lightTheme);
        setIsLight(!isLight);
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                m:noMargin,
            }}
        >
            <LightModeIcon sx={{visibility:!isLight? "hidden" : "visible"}}/>
            <Switch checked={!isLight} onChange={toggleTheme} />
            <DarkModeIcon sx={{visibility:isLight? "hidden" : "visible"}}/>
        </Box>
    );

}