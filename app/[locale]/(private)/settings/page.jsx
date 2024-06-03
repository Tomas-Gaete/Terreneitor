"use client";

import AccordionActions from "@mui/material/AccordionActions";
import { Container, Typography, Card, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

export default function Page() {
	const { t } = useTranslation("common", { keyPrefix: "settings" });

	return (
		<Container
			sx={{
				maxWidth: { md: "65%", xs: "100%" },
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					m: "auto",
					mt: 5,
				}}
			>
				<Typography variant="h3" color="primary" gutterBottom>
					{t("messaging.title")}
				</Typography>
				<Card sx={{ p: 2 }}>
					<Typography variant="p" alignSelf="flex-start">
						AQUI PONER SETTINGS CUANDO LAS TENGA
					</Typography>
				</Card>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					m: "auto",
					mt: 5,
				}}
			>
				<Typography variant="h3" color="primary" gutterBottom>
					{t("parking.title")}
				</Typography>
				<Card sx={{ p: 2 }}>
					<Typography variant="p" alignSelf="flex-start">
						AQUI PONER SETTINGS CUANDO LAS TENGA
					</Typography>
				</Card>
			</Box>
			<AccordionActions>
				<Button>{t("save")}</Button>
				<Button color="secondary">{t("cancel")}</Button>
			</AccordionActions>
		</Container>
	);
}
