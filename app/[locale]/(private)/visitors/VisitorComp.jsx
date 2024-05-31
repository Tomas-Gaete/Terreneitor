"use client";
import { useState } from "react";
import {
	Button,
	Container,
	Autocomplete,
	TextField,
	Typography,
	Modal,
	Box,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import QrReader from "@/app/components/QrReader";
import { createFilterOptions } from "@mui/material/Autocomplete";

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
const filter = createFilterOptions();

export const VisitorComp = ({ visitorsRut, visitorsName }) => {
	const { t } = useTranslation("common", { keyPrefix: "visitors" });
	//Form state
	const [rut, setRut] = useState(""); // MUI doesnt like null values
	const [name, setName] = useState("");
	const [openRut, setOpenRut] = useState(false);
	const [openName, setOpenName] = useState(false);

	// New visitor state
	const [newVisitorModal, setNewVisitorModal] = useState(false);
	const openNewVisitorModal = () => setNewVisitorModal(true);
	const closeNewVisitorModal = () => setNewVisitorModal(false);
	const [newVisitor, setNewVisitor] = useState({
		firstName: "",
		lastName: "",
		rut: "",
	});

	//Modal state
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
							sx={{ mt: 2 }}
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
								<Container
									sx={{
										mt: 2,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										flexDirection: "column",
										mb: 2,
									}}
								>
									<Autocomplete
										disablePortal
										id="combo-box-demo"
										options={[1, 23, 3, 45, 2]}
										sx={{ width: 300 }}
										renderInput={(params) => (
											<TextField {...params} label={t("residence")} />
										)}
									/>

									<Button
										variant="outlined"
										sx={{
											mt: 2,
											alignItems: "center",
											display: "flex",
											flexDirection: "row",
											flexGrow: 1,
										}}
									>
										{t("register_visitor")}
									</Button>
								</Container>
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
						p: 2,
					}}
				>
					<Typography variant="h4">{t("scan_id")}</Typography>
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
					<Box sx={style}>
						<Typography variant="h4" color="primary" align="center">
							{t("new_visitor")}
						</Typography>
						<TextField
							label={t("first_name")}
							value={newVisitor.firstName}
							onChange={(e) =>
								setNewVisitor({ ...newVisitor, firstName: e.target.value })
							}
							sx={{ mt: 2, width: 1 }}
						/>
						<TextField
							label={t("last_name")}
							value={newVisitor.lastName}
							onChange={(e) =>
								setNewVisitor({ ...newVisitor, lastName: e.target.value })
							}
							sx={{ mt: 2, width: 1 }}
						/>
						<TextField
							label={t("rut")}
							value={newVisitor.rut}
							onChange={(e) =>
								setNewVisitor({ ...newVisitor, rut: e.target.value })
							}
							sx={{ mt: 2, width: 1 }}
						/>
						<Button
							variant="outlined"
							color="secondary"
							sx={{
								mt: 2,
								width: "100%",
							}}
							onClick={closeNewVisitorModal}
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
			</Grid>
		</>
	);
};
