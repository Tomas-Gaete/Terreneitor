"use client";

import { useState } from "react";
import {
	Container,
	Box,
	Typography,
	Button,
	Grid,
	TextField,
	Divider,
	Menu,
	MenuItem,
	Tooltip,
	IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import SecurityIcon from "@mui/icons-material/Security";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LanguageChanger from "./LanguageChanger";
import Link from "next/link";

// * This function displays the dashboard page, which includes a welcome message.
export default function Landing_component() {
	const { t, i18n } = useTranslation("landing");

	return (
		<>
			<Box
				component="nav"
				display="flex"
				position="sticky"
				bgcolor="background.default"
				sx={{
					justifyContent: "space-between",
					top: 0,
					zIndex: 10,
					borderBottom: 1,
					borderColor: "divider",
					w: "100vw",
				}}
			>
				<Typography
					sx={{ typography: { xs: "h5", md: "h4" } }}
					p={2}
					fontWeight={500}
					color="primary"
				>
					TERRENEITOR
				</Typography>

				<Box
					alignContent={"center"}
					sx={{ display: { xs: "none", sm: "block" } }}
				>
					<Link href="/login">
						<Button variant="outlined">{t("login")}</Button>
					</Link>
					<LanguageChanger noMargin />
				</Box>

				<HiddenMenu />
			</Box>
			<Box
				component="section"
				sx={{
					position: "relative",
					zIndex: 1,
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			>
				<Box
					component="img"
					sx={{
						minWidth: 1,
						maxHeight: "80vh",
						objectFit: "fill",
						overflow: "hidden",
						opacity: 0.65,
					}}
					alt="HERO IMAGE"
					src="/hero.jpg"
				/>

				<Container
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						margin: 2,
						backgroundColor: "rgba(0,0,0,0.3)",
						width: { xs: "90%", sm: "70vw", md: "50vw" },
					}}
				>
					<Typography
						sx={{ typography: { sm: "h2", xs: "h3" } }}
						gutterBottom
						style={{ fontWeight: 700 }}
					>
						{t("title.a")}
						<br />
						<Box
							component="span"
							sx={{ display: "inline", color: "primary.main" }}
						>
							{t("title.b")}
						</Box>
						<br />
						{t("title.c")}
					</Typography>
					<Typography variant="subtitle1" gutterBottom>
						{t("subtitle")}
					</Typography>
					<Button
						variant="contained"
						href="#features"
						color="secondary"
						sx={{ mb: 2 }}
					>
						{t("learn")}
					</Button>
				</Container>
			</Box>
			<Container
				id="features"
				component="section"
				sx={{
					padding: 2,
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					textAlign: "center",
				}}
			>
				<Typography
					variant="h3"
					fontWeight={300}
					color="primary.main"
					gutterBottom
				>
					{t("features.title")}
				</Typography>

				<Grid
					container
					spacing={4}
					sx={{
						mt: 2,
					}}
				>
					<Grid
						item
						xs={12}
						md={4}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							alignItems: "center",
						}}
					>
						<SecurityIcon fontSize="large" sx={{ transform: "scale(1.8)" }} />

						<Typography variant="h6" gutterBottom>
							{t("features.security.title")}
						</Typography>
						<Typography variant="body1" textAlign="center" gutterBottom>
							{t("features.security.description")}
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						md={4}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							alignItems: "center",
						}}
					>
						<ManageAccountsIcon
							fontSize="large"
							sx={{ transform: "scale(1.8)" }}
						/>
						<Typography variant="h6" gutterBottom>
							{t("features.management.title")}
						</Typography>
						<Typography variant="body1" textAlign="center" gutterBottom>
							{t("features.management.description")}
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						md={4}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							alignItems: "center",
						}}
					>
						<ConnectWithoutContactIcon
							fontSize="large"
							sx={{ transform: "scale(1.8)" }}
						/>
						<Typography variant="h6" gutterBottom>
							{t("features.communication.title")}
						</Typography>
						<Typography variant="body1" textAlign="center" gutterBottom>
							{t("features.communication.description")}
						</Typography>
					</Grid>
				</Grid>
			</Container>
			<Container
				component="section"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography
					variant="h3"
					fontWeight={300}
					color="primary.main"
					gutterBottom
				>
					{t("services.title")}
				</Typography>

				<Grid container>
					<Grid
						item
						xs={12}
						md={6}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							alignItems: "center",
							my: 2,
						}}
					>
						<Box
							component="img"
							sx={{
								borderRadius: 5,
								objectFit: "cover",
								maxWidth: "90%",
							}}
							alt="Service 1"
							src="/delivery.jpg"
						></Box>
						<Typography variant="h5" gutterBottom>
							{t("services.packages.title")}
						</Typography>
						<Typography variant="body1" textAlign="justify" mx={4} gutterBottom>
							{t("services.packages.description")}
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							alignItems: "center",
							my: 2,
						}}
					>
						<Box
							component="img"
							sx={{
								borderRadius: 5,
								objectFit: "cover",
								maxWidth: "90%",
							}}
							alt="Service 4"
							src="/parking.jpg"
						></Box>
						<Typography variant="h5" gutterBottom>
							{t("services.parking.title")}
						</Typography>
						<Typography variant="body1" textAlign="justify" mx={4} gutterBottom>
							{t("services.parking.description")}
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							alignItems: "center",
							my: 2,
						}}
					>
						<Box
							component="img"
							sx={{
								borderRadius: 5,
								objectFit: "cover",
								maxWidth: "90%",
							}}
							alt="SVisitor Management"
							src="/visitorManagement.jpg"
						></Box>
						<Typography variant="h5" gutterBottom>
							{t("services.visitors.title")}
						</Typography>
						<Typography variant="body1" textAlign="justify" mx={4} gutterBottom>
							{t("services.visitors.description")}
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							alignItems: "center",
							my: 2,
						}}
					>
						<Box
							component="img"
							sx={{
								borderRadius: 5,
								objectFit: "cover",
								maxWidth: "90%",
							}}
							alt="Service 1"
							src="/notification.jpg"
						></Box>
						<Typography variant="h5" gutterBottom>
							{t("services.notifications.title")}
						</Typography>
						<Typography variant="body1" textAlign="justify" mx={4} gutterBottom>
							{t("services.notifications.description")}
						</Typography>
					</Grid>
				</Grid>
			</Container>
			<Container
				component="section"
				sx={{
					p: 2,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Divider sx={{ width: "100%", my: 2, mb: 4 }} />
				<Typography variant="h3" fontWeight={500} color="primary.main">
					{t("contact.title")}
				</Typography>
				<Typography variant="h6" color="secondary.main">
					{t("contact.subtitle")}
				</Typography>

				<Box
					component="form"
					sx={{
						my: 2,
						p: 2,
					}}
				>
					<Grid
						container
						spacing={2} // Add spacing between Grid items
					>
						<Grid item xs={12} md={6}>
							<TextField
								id="firstName"
								label={t("contact.first_name")}
								variant="outlined"
								required
								fullWidth
								sx={{ my: 1 }}
								InputLabelProps={{ color: "secondary" }}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								id="lastName"
								label={t("contact.last_name")}
								variant="outlined"
								required
								fullWidth
								sx={{ my: 1 }}
								InputLabelProps={{ color: "secondary" }}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								id="email"
								label={t("contact.email")}
								type="email"
								variant="outlined"
								required
								fullWidth
								sx={{ my: 1 }}
								InputLabelProps={{ color: "secondary" }}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								id="phoneNumber"
								label={t("contact.phone")}
								variant="outlined"
								type="tel"
								required
								fullWidth
								sx={{ my: 1 }}
								InputLabelProps={{ color: "secondary" }}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								name="message"
								id="message"
								label={t("contact.message")}
								fullWidth
								required
								multiline
								minRows={4}
								variant="filled"
								sx={{ my: 1 }}
							/>
						</Grid>
					</Grid>
					<Button
						variant="contained"
						type="submit"
						color="secondary"
						sx={{ my: 2 }}
					>
						{t("contact.send")}
					</Button>
				</Box>
			</Container>
		</>
	);
}
//TODO: error messages translation on form

function HiddenMenu() {
    const { t } = useTranslation("landing");
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ display: { xs: "block", sm: "none"}, alignContent:"center" }}>
			<IconButton
				onClick={handleClick}
				size="small"
				sx={{ mx: 1 }}
				aria-controls={open ? "account-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
			>
				<MenuIcon color="primary" sx={{ width: 32, height: 32 }} />
			</IconButton>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem onClick={handleClose}>
                    <LanguageChanger />
                </MenuItem>
				<MenuItem onClick={handleClose} sx={{justifyContent:"center"}}>
                    <Link href="/login" >
						<Button variant="outlined">{t("login")}</Button>
					</Link>
                </MenuItem>
			</Menu>
		</Box>
	);
}
