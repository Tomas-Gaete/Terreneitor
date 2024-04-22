"use client";
import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Container,
	Typography,
	Autocomplete,
	TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { getVisitors } from "@/app/lib/actions";
import Image from "next/image";

export default function Visitors() {
	return (
		<Container maxWidth="lg" sx={{ mt: 2, flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid xs={12} sx={{ my: 2}}>
		
						<Typography variant="h4" color="text.secondary" align="center">
							Ingresar Visita
						</Typography>
						<VisitorComp />
					
				</Grid>
				<Grid xs={12}>
					<Link href="#">
						<Button
							variant="outlined"
							color="secondary"
							sx={{
								width: "100%",
								textAlign: "center",
								p: 2,
							}}
						>
							<Typography variant="h4">Leer Cédula</Typography>
						</Button>
					</Link>
				</Grid>
				<Grid xs={12} md={6}>
					<Box
						sx={{
							width: "100%",
							border: 0.1,
							borderRadius: 1,
							borderColor: "text.secondary",
							textAlign: "center",
						}}
					>
						<Typography variant="h4" color="text.secondary">
							Visitas frecuentes
						</Typography>
					</Box>
				</Grid>
				<Grid xs={12} md={6}>
					<Link href="#">
						<Box
							sx={{
								width: "100%",
								border: 0.1,
								borderRadius: 1,
								borderColor: "text.secondary",
								textAlign: "center",
							}}
						>
							<Typography variant="h4" color="text.secondary">
								Estacionamientos
							</Typography>
						</Box>
					</Link>
				</Grid>
			</Grid>
		</Container>
	);
}

const VisitorComp = () => {
	const [rut, setRut] = useState("");
	const [name, setName] = useState("");
	const [openRut, setOpenRut] = useState(false);
	const [openName, setOpenName] = useState(false);
	const [visitorsRut, setVisitorsRut] = useState([]);
	const [visitorsName, setVisitorsName] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const { visitorsRut, visitorsName } = await getVisitors();
			setVisitorsRut(visitorsRut);
			setVisitorsName(visitorsName);
		};
		fetchData();
	}, []);

	//TODO: maybe only load the data when the user clicks on the input/ optimise the data fetching

	return (
		<>
			<Grid container sx={{ width: 1 }} spacing={2}>
				<Grid xs={12} md={6} >
					<Autocomplete
						id="autocomplete-name"
						sx={{ mt: 2, width: 1 }}
						disablePortal
						forcePopupIcon={false}
						noOptionsText="No hay opciones"
						value={name}
						open={openName}
						onOpen={() => {}}
						onClose={() => setOpenName(false)}
						options={visitorsName}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Nombre"
								InputLabelProps={{ color: "secondary" }}
							/>
						)}
						onInputChange={(event, value) => {
							if (rut != "") return;
							setOpenName(value.length > 0); // Set open to true when there's input
						}}
						onChange={(event, value) => {
							setName(value);
							if (!value) {
								setRut("");
								return;
							}
							setRut(
								visitorsRut.find((visitor) => visitor.id === value.id).label,
							);
						}}
					/>
				</Grid>
				<Grid xs={12} md={6}>
					<Autocomplete
						id="autocomplete-rut"
						sx={{ mt: 2 }}
						disablePortal
						forcePopupIcon={false}
						noOptionsText="No hay opciones"
						value={rut}
						open={openRut}
						onOpen={() => {}}
						onClose={() => setOpenRut(false)}
						options={visitorsRut}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Rut"
								InputLabelProps={{ color: "secondary" }}
							/>
						)}
						onInputChange={(event, value) => {
							if (name != "") return;
							setOpenRut(value.trim().length > 0); // Set open to true when there's input
						}}
						onChange={(event, value) => {
							setRut(value);
							if (!value) {
								setName("");
								return;
							}
							setName(
								visitorsName.find((visitor) => visitor.id === value.id).label,
							);
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
										<TextField {...params} label="Residencia" />
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
									Ingresar
								</Button>
							</Container>
						</>
					)}
				</Grid>
			</Grid>
		</>
	);
};

function AddVisit() {}
