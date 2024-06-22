"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import {
	Container,
	Typography,
	Card,
	Box,
	TextField,
	InputAdornment,
	AccordionActions,
	Button,
    Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { updateSettings } from "@/app/lib/actions";

export default function Settings({ db_duration = 0 }) {
	const { t } = useTranslation("common", { keyPrefix: "settings" });

	const [duration, setDuration] = useState(db_duration);
	const [error, dispatch] = useFormState(updateSettings);

	const handleChange = (event) => {
		// This is a simple validation to avoid negative values and non numeric values

		const value = event.target.value;
		if (value < 0 || isNaN(value)) {
			return;
		}
		setDuration(value);
	};

	return (
		<Container
			component="form"
            action={dispatch}
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
					<Box
						sx={{
							display: "flex",
							margin: "auto",
							width: "35%",
						}}
					>
						<TextField
							id="duration"
							label={t("parking.max")}
							type="tel"
							InputLabelProps={{ shrink: true }}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">{t("parking.hours")}</InputAdornment>
								),
								name: "duration",
							}}
							variant="standard"
							value={duration}
							onChange={handleChange}
							margin="normal"
						/>
					</Box>
                    {error && <Alert severity="error">{t(error)}</Alert>}
				</Card>
			</Box>
			<AccordionActions>
				<Button type="submit">{t("save")}</Button>
				<Button color="secondary">{t("cancel")}</Button>
			</AccordionActions>
		</Container>
	);
}
