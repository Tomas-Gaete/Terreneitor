'use client';
import Alert from "@mui/material/Alert";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from "react-i18next";
import LanguageChanger from "@components/LanguageChanger";
import { thenewUser } from "@/app/lib/actions";
import { useState } from "react";


/*
    * This is the page where the user can sign up, entering their first name, last name, email, and password. 
*/


// * This function is used to display the copyright information at the bottom of the page.
function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Terrenaitor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// * This function displays the sign up form, requesting values such as first name, last name, email, and password in the "<TextField>" sections. It also includes options for "I want to receive inspiration, marketing promotions and updates via email." and "Already have an account? Sign in" for greater variability of choices.

//TODO: connect the created user properly to the database
export default function SignUp() {

  const { t } = useTranslation("translate-register");
  const [isError, setisError] = useState(false);


  

  const handleSubmit = (event) => {

    event.preventDefault();
    const data2 = new FormData(event.currentTarget);
    const valor = thenewUser(data2);
    if (valor){
      setisError(valor);

    }
    

  };

  return (
    
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signup")}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={t("firstname")}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t("lastname")}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t("email")}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t("password")}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label= {t("updates")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color = "secondary"
              
              
              sx={{ mt: 3, mb: 2 }}
            >

              {t("signup")}
            </Button>
            {isError && <Alerta message="AlreadyExists" />}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="http://localhost:3000/es/login" variant="body2">
                {t("signin")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ 
          my: 5,
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center'
         }}>

          <LanguageChanger />
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}
function Alerta({ message }) {
	const { t } = useTranslation("errors");
	return (
		<Alert variant="outlined" severity="error" sx={{ mt: 4 }}>
			{t(message)}
		</Alert>
	);
}





