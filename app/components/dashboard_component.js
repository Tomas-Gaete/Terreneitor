"use client";

import { useTranslation } from "react-i18next";
import { Box, Typography, Button } from "@mui/material";



// * This function displays the dashboard page, which includes a welcome message.
export default async function Dashboard_component() {
    const { t, i18n } = useTranslation("translate-dashboard");



	return (
        <Box>
            {t("welcome")} 
        </Box>
        
	);
}
