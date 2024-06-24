"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Settings } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";

import LanguageChanger from "./LanguageChanger";

import { useTranslation } from "react-i18next";

import { LogOut } from "../lib/actions";
import Link from "next/link";
import ThemeSelector from "./ThemeSelector";

// * This function displays the settings menu, which includes options for the user to view their profile, change the language, and log out.
function NavbarSettings({ text }) {
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title={text.settings}>
				<Settings
					fontSize="medium"
					sx={{ ml: 1 }}
					onClick={handleOpenUserMenu}
				/>
			</Tooltip>

			<Menu
				sx={{ mt: "45px" }}
				id="menu-appbar2"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				<MenuItem onClick={handleCloseUserMenu}>
					<Link href="/profile" style={{ textDecoration: "none", width:"100%"}}>
						<Typography color="primary" sx={{ m: "auto" }} textAlign="center">
							{text.profile}
						</Typography>
					</Link>
				</MenuItem>
				<MenuItem onClick={handleCloseUserMenu}>
					<LanguageChanger />
				</MenuItem>
				<MenuItem>
					<ThemeSelector />
				</MenuItem>
				{/* TODO: remove weird red border when selected */}
				<MenuItem onClick={handleCloseUserMenu}>
					<form
						action={async () => {
							await LogOut({ redirectTo: "/login" });
						}}
					>
						<Button variant="outlined" color="primary" type="submit">
							{text.logout}
							<LogoutIcon sx={{ ml: 1 }} />
						</Button>
					</form>
				</MenuItem>
			</Menu>
		</Box>
	);
}

// * This function displays the responsive app bar, which includes a menu icon that opens a menu with the pages of the app, and a title that links to the home page.
function ResponsiveAppBar({ role, community }) {
	const { t } = useTranslation("common");
	const pages = [
		[t("home"), "/dashboard"],
		[t("visitors.title"), "/visitors"],
		[t("delivery"), "/delivery"],
	];

	if (role === "admin" || role === "concierge") {
		pages.push([t("settings.parking.title"), "/parking"]);
	}

	//Only admins can access the settings page
	if (role === "admin") {
		pages.push([t("settings.title"), "/settings"]);
	}

	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const text = {
		change_language: t("change_language"),
		logout: t("logout"),
		profile: t("profile"),
		settings: t("settings.title"),
	};

	return (
		<AppBar position="static" color="transparent">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/dashboard"
							color="primary"
							sx={{
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								textDecoration: "none",
							}}
						>
							TERRENEITOR
						</Typography>
						<Typography
							color="secondary"
							fontSize={12}
							alignSelf={"flex-end"}
							justifySelf={"end"}
							fontWeight={700}
							display={{ xs: "none", md: "flex" }}
						>
							{community}
						</Typography>
					</Box>

					<Divider
						orientation="vertical"
						variant="middle"
						flexItem
						sx={{ ml: 2, my: 2, display: { xs: "none", md: "flex" } }}
					/>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Link href={page[1]} style={{ textDecoration: "none" }}>
										<Typography textAlign="center" color="text.secondary">
											{page[0]}
										</Typography>
									</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/dashboard"
						color="primary"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							textDecoration: "none",
						}}
					>
						TERRENEITOR
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Link
								key={page}
								href={page[1]}
								style={{ textDecoration: "none" }}
							>
								<Button
									sx={{
										my: 2,
										color: "primary.contrastText",
										display: "block",
									}}
								>
									{page[0]}
								</Button>
							</Link>
						))}
					</Box>

					<NavbarSettings text={text} />
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
