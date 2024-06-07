"use client";

import {
	Container,
	Typography,
	Box,
	Autocomplete,
	TextField,
	Button,
	Alert,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { createFilterOptions } from "@mui/material/Autocomplete";

import { addNewFrequentVisitor } from "@/app/lib/actions";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useFormState } from "react-dom";

const filter = createFilterOptions();

export default function FrequentVisitor({
	visitorsRut,
	visitors,
	residentRut,
	residents,
}) {
	const [openVisitor, setOpenVisitor] = useState(false);
	const [openResident, setOpenResident] = useState(false);

	console.log("visitorsRut");
	console.log(residentRut);

	const [visitorRut, setVisitorRut] = useState("");

	const [frequentVisitor, setFrequentVisitor] = useState({
		rut: "",
		firstname: "",
		lastname: "",
	});
	const [resident, setResident] = useState({
		rut: "",
		firstname: "",
		lastname: "",
	});

	const [errorMessage, dispatch] = useFormState(
		addNewFrequentVisitor,
		undefined,
	);

	const { t } = useTranslation("common", { keyPrefix: "visitors" });

	visitorsRut = visitorsRut ?? [];
	return (
		<Container>
			<Typography
				textAlign="center"
				variant="h3"
				color="primary"
				textTransform="capitalize"
				gutterBottom
			>
				{t("frequent_visitors_description")}
			</Typography>
			<Box
				component="form"
				action={dispatch}
				sx={{
					maxWidth: { md: "50%", xs: "100%" },
					margin: "auto",
					marginBottom: 10,
				}}
			>
				<Grid container spacing={2} width="100%">
					<Grid xs="12">
						<Typography variant="h5" color="secondary">
							Visitor Info
						</Typography>
					</Grid>
					<Grid xs={12}>
						<Autocomplete
							id="visitor-rut"
							name="visitor-rut"
							inputProps={{ name: "visitor-rut" }}
							sx={{ mt: 2, width: 1 }}
							disablePortal
							freeSolo
							forcePopupIcon={false}
							noOptionsText={t("no_visitors")}
							value={visitorRut}
							open={openVisitor}
							onClose={() => setOpenVisitor(false)}
							options={visitorsRut}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t("rut")}
									name="visitor-rut"
									InputLabelProps={{ color: "secondary" }}
								/>
							)}
							renderOption={(props, option) => (
								<li {...props} key={props.key}>
									{option.label}
								</li>
							)}
							onInputChange={(event, value) => {
								if (visitorRut != "") return;
								setOpenVisitor(value?.length > 0); // Set open to true when there's input
							}}
							onChange={(event, value) => {
								if (value) {
									setVisitorRut(value?.inputValue ?? value?.label);
								} else {
									setVisitorRut("");
								}

								//Keep both fields in sync
								if (!value) {
									setFrequentVisitor({
										rut: "",
										firstname: "",
										lastname: "",
									});
									return;
								}
								const exists = visitors.find(
									(visitor) => visitor.id === value.id,
								);
								if (exists) {
									setFrequentVisitor({
										rut: exists.rut,
										firstname: exists.firstname,
										lastname: exists.lastname,
									});
								} else {
									setTimeout(() => {
										setFrequentVisitor({
											rut: value?.inputValue ?? value?.label,
											firstname: "",
											lastname: "",
										});
									});
								}
								setOpenVisitor(false);
							}}
							filterOptions={(options, params) => {
								const filtered = filter(options, params);
								if (params.inputValue !== "") {
									filtered.push({
										inputValue: params.inputValue,
										label: t("add", { input: params.inputValue }),
									});
								}
								return filtered;
							}}
						/>
					</Grid>
					<Grid xs={12} md={6}>
						<TextField
							id="visitor-first-name"
							name="visitor-first-name"
							label={t("first_name")}
							value={frequentVisitor.firstname}
							onChange={(event) =>
								setFrequentVisitor({
									...frequentVisitor,
									firstname: event.target.value,
								})
							}
							fullWidth
						/>
					</Grid>
					<Grid xs={12} md={6}>
						<TextField
							id="visitor-last-name"
							name="visitor-last-name"
							label={t("last_name")}
							value={frequentVisitor.lastname}
							onChange={(event) =>
								setFrequentVisitor({
									...frequentVisitor,
									lastname: event.target.value,
								})
							}
							fullWidth
						/>
					</Grid>

					<Grid xs="12">
						<Typography variant="h5" color="secondary">
							Resident Info
						</Typography>
					</Grid>
					<Grid xs={12}>
						<Autocomplete
							id="autocomplete-ResidentRut"
							name="resident-rut"
							sx={{ mt: 2, width: 1 }}
							disablePortal
							forcePopupIcon={false}
							noOptionsText={t("no_visitors")}
							value={resident.rut}
							open={openResident}
							onClose={() => setOpenResident(false)}
							options={residentRut}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t("rut")}
									name="resident-rut"
									InputLabelProps={{ color: "secondary" }}
								/>
							)}
							renderOption={(props, option) => (
								<li {...props} key={props.key}>
									{option.label}
								</li>
							)}
							onInputChange={(event, value) => {
								if (resident.rut != "") return;
								setOpenResident(value.length > 0); // Set open to true when there's input
							}}
							onChange={(event, value) => {
								if (value) {
									setResident({
										...resident,
										rut: value?.inputValue ?? value?.label,
									});
								} else {
									setResident({
										...resident,
										rut: "",
									});
								}

								if (!value) {
									setResident({
										rut: "",
										firstname: "",
										lastname: "",
									});
									return;
								}
								const exists = residents.find(
									(resident) => resident.id === value.id,
								);
								if (exists) {
									setResident({
										rut: exists.rut,
										firstname: exists.firstname,
										lastname: exists.lastname,
									});
								} else {
									setTimeout(() => {
										setResident({
											rut: value?.inputValue ?? value?.label,
											firstname: "",
											lastname: "",
										});
									});
								}
								setOpenResident(false);
							}}
						/>
					</Grid>
					<Grid xs={12} md={6}>
						<TextField
							id="resident-first-name"
							name="resident-first-name"
							label={t("first_name")}
							value={resident.firstname}
							inputProps={{ readOnly: true }}
							fullWidth
						/>
					</Grid>
					<Grid xs={12} md={6}>
						<TextField
							id="resident-last-name"
							name="resident-last-name"
							label={t("last_name")}
							value={resident.lastname}
							inputProps={{ readOnly: true }}
							fullWidth
						/>
					</Grid>
				</Grid>

				<Button
					variant="contained"
					sx={{ marginTop: 2 }}
					type="submit"
					color="primary"
					fullWidth
				>
					{t("register_frequent")}
				</Button>
				{errorMessage === "repeated" && (
					<Alert sx={{ mt: 2 }} severity="error">
						{t("repeated")}
					</Alert>
				)}
				{errorMessage === true && (
					<Alert sx={{ mt: 2 }} severity="error">
						{t("error")}
					</Alert>
				)}
				{errorMessage === false && (
					<Alert sx={{ mt: 2 }} severity="success">
						{t("success")}
					</Alert>
				)}
			</Box>
		</Container>
	);
}
