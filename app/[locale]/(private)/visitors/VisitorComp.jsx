"use client";
import { useEffect, useState } from "react";
import {
	Button,
	Autocomplete,
	TextField,
	Typography,
	Modal,
	Box,
    Alert
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import QrReader from "@/app/components/QrReader";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useFormState, useFormStatus } from "react-dom";
import { addVisitor, addVisitorVehicle } from "@/app/lib/actions";
import { set } from "zod";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "70vh",
	height: "70vh",
	bgcolor: "background.paper",
	borderRadius: 5,
	boxShadow: 24,
	p: 4,
};
function success() {
	alert("success!");
}
const filter = createFilterOptions();

export const VisitorComp = ({
	visitorsRut,
	visitorsName,
	residences,
	visitorLicense,
}) => {
	const { t } = useTranslation("common", { keyPrefix: "visitors" });
	//Autocomplete states and values
	const [rut, setRut] = useState("");
	const [name, setName] = useState("");
	const [openRut, setOpenRut] = useState(false);
	const [openName, setOpenName] = useState(false);

    //form handlers
	const [errorMessage, dispatch] = useFormState(addVisitor, undefined);
    const [errorMessageVehicle, dispatchVehicle] = useFormState(addVisitorVehicle, undefined); 

	// New visitor states
	const [newVisitorModal, setNewVisitorModal] = useState(false);
	const closeNewVisitorModal = () => setNewVisitorModal(false);
	const [newVisitor, setNewVisitor] = useState({
		firstName: "",
		lastName: "",
		rut: "",
	});
	const [license, setLicense] = useState("");
	const [visitorVehicle, setVisitorVehicle] = useState();

	//Visitor Modal state
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	//License Modal state
	const [openLicenseModal, setOpenLicenseModal] = useState(false);
	const handleCloseLicense = () => {
		setLicense(visitorVehicle.license_plate);
		setOpenLicenseModal(false)
	};

	const handleRead = (result) => {
		const urlObj = new URL(result.data);
		const run = urlObj.searchParams.get("RUN");
		const userid = visitorsRut.find((visitor) => visitor.label === run)?.id;
		if (userid) {
			setRut(run);
			setName(visitorsName.find((visitor) => visitor.id === userid).label);
		} else {
			setNewVisitorModal(true);
			setNewVisitor({
				rut: run,
				firstName: "",
				lastName: "",
			});
		}
		handleClose();
	};

	return (
		<>
			<Grid xs={12} sx={{ my: 2 }}>
				<Typography variant="h4" color="text.secondary" align="center">
					{t("title")}
				</Typography>
                {errorMessageVehicle && <Alert severity="error">{errorMessageVehicle}</Alert>}
				<Grid container sx={{ width: 1 }} spacing={2}>
					<Grid xs={12} md={6}>
						<Autocomplete
							id="autocomplete-name"
							sx={{ mt: 2, width: 1 }}
							disablePortal
							forcePopupIcon={false}
							noOptionsText={t("no_visitors")}
							value={name}
							open={openName}
							onClose={() => setOpenName(false)}
							options={visitorsName}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t("name")}
									InputLabelProps={{ color: "secondary" }}
								/>
							)}
							renderOption={(props, option) => (
								<li {...props} key={props.key}>
									{option.label}
								</li>
							)}
							onInputChange={(event, value) => {
								if (rut != "") return;
								setOpenName(value.length > 0); // Set open to true when there's input
							}}
							onChange={(event, value) => {
								setName(value);
								//Keep both fields in sync
								if (!value) {
									setRut("");
									return;
								}
								setName(value.inputValue ?? value.label);
								let newVisitor = visitorsRut.find(
									(visitor) => visitor.id === value.id,
								)?.label;
								if (!newVisitor) {
									setTimeout(() => {
										setNewVisitorModal(true);
										let newVisitorObj;
										if (value.inputValue.split(" ").length < 2) {
											newVisitorObj = {
												rut: "",
												firstName: value.inputValue,
												lastName: "",
											};
										} else {
											newVisitorObj = {
												rut: "",
												firstName: value.inputValue.split(" ")[0],
												lastName: value.inputValue.split(" ")[1],
											};
										}

										setNewVisitor(newVisitorObj);
									});
								} else {
									setRut(newVisitor);
								}
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
						<Autocomplete
							id="autocomplete-rut"
							sx={{ mt: 2, width: 1 }}
							disablePortal
							forcePopupIcon={false}
							noOptionsText={t("no_visitors")}
							value={rut}
							open={openRut}
							onClose={() => setOpenRut(false)}
							options={visitorsRut}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t("rut")}
									InputLabelProps={{ color: "secondary" }}
								/>
							)}
							renderOption={(props, option) => (
								<li {...props} key={props.key}>
									{option.label}
								</li>
							)}
							onInputChange={(event, value) => {
								if (name != "") return;
								setOpenRut(value.trim().length > 0); // Set open to true when there's input
							}}
							onChange={(event, value) => {
								//Keep both fields in sync
								if (!value) {
									setName("");
									return;
								}
								setRut(value.inputValue ?? value.label);

								let newVisitor = visitorsName.find(
									(visitor) => visitor.id === value.id,
								)?.label;
								if (!newVisitor) {
									setTimeout(() => {
										setNewVisitorModal(true);
										setNewVisitor({
											rut: value.inputValue,
											firstName: "",
											lastName: "",
										});
									});
								} else {
									setName(newVisitor);
								}
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
					<Grid xs={12}>
						{rut && name && (
							<>
								<Grid container spacing={2}>
									<Grid xs={12} md={6}>
										<Autocomplete
											disablePortal
											fullWidth
											forcePopupIcon={false}
											id="combo-box-demo"
											options={residences}
											renderInput={(params) => (
												<TextField
													{...params}
													label={t("residence")}
													InputLabelProps={{ color: "secondary" }}
												/>
											)}
										/>
									</Grid>
									<Grid xs={12} md={6}>
										<Autocomplete
											id="autocomplete-license"
											fullWidth
											disablePortal
											forcePopupIcon={false}
											value={license}
											options={visitorLicense}
											renderInput={(params) => (
												<TextField
													{...params}
													label={t("licence_plate")}
													InputLabelProps={{ color: "secondary" }}
												/>
											)}
											renderOption={(props, option) => (
												<li {...props} key={props.key}>
													{option.label}
												</li>
											)}
											onChange={(event, value) => {
												if (!value) return;
												setLicense(value?.inputValue ?? value?.label);
												let newVisitorLicense = visitorLicense.find(
													(license) => license.id === value.id,
												)?.label;
												if (!newVisitorLicense) {
													setTimeout(() => {
														setOpenLicenseModal(true);
														setLicense(value.inputValue);
														setVisitorVehicle({
															license_plate: value.inputValue,
															visitor_id: visitorsRut.find(
																(visitor) => visitor.label === rut,
															).id,
															brand: "",
															model: "",
															color: "",
														});
													});
												} else {
													setLicense(newVisitorLicense);
												}
											}}
											filterOptions={(options, params) => {
												let filtered = filter(options, params);
												//TODO:
												//filter licence plates that dont belong to the visit
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

									<Grid
										xs={12}
										sx={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<Button
											variant="outlined"
											size="large"
											sx={{
												mt: 2,
												alignItems: "center",
												display: "flex",
												flexDirection: "row",
												flexGrow: 1,
											}}
										>
											{t("register_visit")}
										</Button>
									</Grid>
								</Grid>
							</>
						)}
					</Grid>
				</Grid>
			</Grid>
			<Grid xs={12}>
				<Button
					variant="outlined"
					color="secondary"
					onClick={handleOpen}
					sx={{
						width: "100%",
						textAlign: "center",
						border: "1px solid",
						p: 2,
					}}
				>
					<Typography variant="h4" fontWeight={500}>
						{t("scan_id")}
					</Typography>
				</Button>
				<Modal
					open={newVisitorModal}
					onClose={closeNewVisitorModal}
					aria-labelledby="modal-modal2-title"
					aria-describedby="modal-modal2-description"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box 
                        component="form" 
                        action={dispatch} 
                        sx={style}
                        noValidate 
                    >
						<Typography variant="h4" color="primary" align="center">
							{t("new_visitor")}
						</Typography>
						<TextField
							label={t("first_name")}
							value={newVisitor.firstName}
							onChange={(e) =>
								setNewVisitor({ ...newVisitor, firstName: e.target.value })
							}
							id="firstName"
							name="firstName"
							sx={{ mt: 2, width: 1 }}
						/>
						<TextField
							label={t("last_name")}
							value={newVisitor.lastName}
							onChange={(e) =>
								setNewVisitor({ ...newVisitor, lastName: e.target.value })
							}
							id="lastName"
							name="lastName"
							sx={{ mt: 2, width: 1 }}
						/>
						<TextField
							label={t("rut")}
							value={newVisitor.rut}
							onChange={(e) =>
								setNewVisitor({ ...newVisitor, rut: e.target.value })
							}
							id="rut"
							name="rut"
							sx={{ mt: 2, width: 1 }}
						/>
						<Button
							variant="outlined"
							color="secondary"
							type="submit"
							sx={{
								mt: 2,
								width: "100%",
							}}
							onClick={success}
						>
							{t("register")}
						</Button>
					</Box>
				</Modal>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box sx={style}>
						<QrReader handleRead={handleRead} />
						<Button
							onClick={handleClose}
							sx={{ alignSelf: "center", m: 2 }}
							variant="outlined"
						>
							{t("close")}
						</Button>
					</Box>
				</Modal>

				<Modal
					open={openLicenseModal}
					onClose={handleCloseLicense}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box 
                        sx={style}
                        component="form"
                        action={dispatchVehicle}    
                    >
						<Typography variant="h4" color="primary" align="center">
							{t("new_vehicle")}
						</Typography>
                        <input type="hidden" name="visitor_id" value={visitorVehicle?.visitor_id} />
						<TextField
                            name="license_plate"
							label={t("licence_plate")}
							value={visitorVehicle?.license_plate}
							onChange={(e) =>
								setVisitorVehicle({
									...visitorVehicle,
									license_plate: e.target.value,
								})
							}
							sx={{ mt: 2, width: 1 }}
                            InputLabelProps={{ color: "secondary" }}
                            required
						/>
						<TextField
                            name="brand"
							label={t("brand")}
							value={visitorVehicle?.brand}
							onChange={(e) =>
								setVisitorVehicle({ ...visitorVehicle, brand: e.target.value })
							}
							sx={{ mt: 2, width: 1 }}
                            InputLabelProps={{ color: "secondary" }}
                            required
						/>
						<TextField
                            name="model"
							label={t("model")}
							value={visitorVehicle?.model}
							onChange={(e) =>
								setVisitorVehicle({ ...visitorVehicle, model: e.target.value })
							}
							sx={{ mt: 2, width: 1 }}
                            InputLabelProps={{ color: "secondary" }}
                            required
						/>
						<TextField
                            name="color"
							label={t("color")}
							value={visitorVehicle?.color}
							onChange={(e) =>
								setVisitorVehicle({ ...visitorVehicle, color: e.target.value })
							}
							sx={{ mt: 2, width: 1 }}
                            InputLabelProps={{ color: "secondary" }}
                            required
						/>
						<Button
                            type="submit"
							variant="outlined"
							color="secondary"
                            onClick={handleCloseLicense}
							sx={{
								mt: 2,
								width: "100%",
							}}
						>
							{t("add_vehicle")}
						</Button>
					</Box>
				</Modal>
			</Grid>
		</>
	);
};
