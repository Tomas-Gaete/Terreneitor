"use client";

import { Container, Typography, Button } from '@mui/material';
import { useTranslation } from "react-i18next";



// * This function displays the dashboard page, which includes a welcome message.
export default function Landing_component() {
    const { t, i18n } = useTranslation("translate-landingpage");

	return (
        <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          {t("welcome")}
        </Typography>
        <Typography variant="body1" gutterBottom>
            {t("description")}
        </Typography>
        <Button variant="contained" >
            {t("learn")}
        </Button>
      </Container>
	);
}
