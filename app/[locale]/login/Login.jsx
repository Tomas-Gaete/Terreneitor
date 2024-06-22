"use client";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import LanguageChanger from "@components/LanguageChanger";
import ThemeSelector from "@/app/components/ThemeSelector";
import InteractiveVideo from "@/app/components/InteractiveMode";

export default function SignIn({ children }) {
	const { t } = useTranslation("translate-login");
	const [errorMessage, dispatch] = useFormState(authenticate, undefined);
	const { i18n } = useTranslation(); //TODO: add link for forgot password option
	const [showPassword, setShowPassword] = useState(false);
	const [interactiveMode, setInteractiveMode] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	return (
		<>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>

					<Avatar
                        onClick={() => setInteractiveMode((mode) => !mode)}
						sx={{
							m: 1,
							bgcolor: "secondary.main",
						}}
					>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{t("login")}
					</Typography>

					<Box
						component="form"
						action={dispatch}
						noValidate
						sx={{
							mt: 1,
						}}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label={t("email")}
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label={t("password")}
							type={showPassword ? "text" : "password"}
							id="password"
							autoComplete="current-password"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						{errorMessage && <ErrorAlert message={errorMessage} />}
						<LoginButton />
					</Box>
					{children}
					<Grid container>
						<Grid item xs>
							{/* change the url to dynamic ones */}
							<Link href="http://localhost:3000/es/#" variant="body2">
								{t("forgotpassword")}
							</Link>
						</Grid>
						<Grid item>
							<Link
								href={`http://localhost:3000/${i18n.language}/register`}
								variant="body2"
							>
								{t("register")}
							</Link>
						</Grid>
					</Grid>
					<Box
						sx={{
							my: 3,
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<LanguageChanger noMargin />
						<ThemeSelector noMargin />
					</Box>
				</Box>
				<Copyright
					sx={{
						mt: 8,
						mb: 4,
					}}
				/>
			</Container>
  
			{interactiveMode && (
				<>
					<InteractiveVideo videoId={"zZ7AimPACzc"} />
					<InteractiveVideo videoId={"7yl7Wc1dtWc"} shouldSetRight />
				</>
			)}
		</>
	);
}

// * This function indicates the copyright, displaying the page name and the year.
function Copyright(props) {
	return (
		<Typography variant="body2" color="white" align="center" {...props}>
			{"Copyright © "}
			<Link color="inherit" href="http://localhost:3000/">
				Terreneitor
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

// * This function displays the login form, requesting values such as email and password in the "<TextField>" sections. It also includes options for "Forgot password?" and "Don't have an account? Sign Up" for greater variability of choices. Additionally, it shows the errorMessage in case the user entered their data incorrectly.

// * This function is used to display the login button, which is used to send the user's data to the server for authentication.
function LoginButton() {
	const { pending } = useFormStatus();
	const { t } = useTranslation("translate-login");

	return (
		<Button
			type="submit"
			fullWidth
			variant="outlined"
			color="primary"
			sx={{ mt: 3, mb: 2 }}
			aria-disabled={pending}
		>
			{t("login")}
		</Button>
	);
}

// * This function is used to display an error message in case the user entered their data incorrectly.
function ErrorAlert({ message }) {
	const { t } = useTranslation("errors");
	return (
		<Alert variant="outlined" severity="error" sx={{ mt: 4 }}>
			{t(message)}
		</Alert>
	);
}
