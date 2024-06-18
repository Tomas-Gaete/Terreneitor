"use client"; // This is necessary for client-side components in Next.js 13+

import React from "react";
import Link from "next/link";
import { Box, Container, Grid, Typography, List, ListItem, TextField, Button, AppBar, Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Component = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Acme Building</Typography>
            <nav>
              <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                <ListItem sx={{ width: 'auto' }}>
                  <Link href="#" prefetch={false} passHref>
                    <Typography variant="body1" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      Home
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ width: 'auto' }}>
                  <Link href="#" prefetch={false} passHref>
                    <Typography variant="body1" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      Amenities
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ width: 'auto' }}>
                  <Link href="#" prefetch={false} passHref>
                    <Typography variant="body1" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      Contact
                    </Typography>
                  </Link>
                </ListItem>
              </List>
            </nav>
          </Container>
        </Toolbar>
      </AppBar>
      <Box component="main" flex="1" py={12} px={6}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item lg={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Delivery Instructions
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Please follow these instructions when delivering packages to the building:
              </Typography>
              <List>
                <ListItem>
                  <Box>
                    <Typography variant="h6">Front Desk</Typography>
                    <Typography variant="body1">
                      All packages must be dropped off at the front desk. The concierge will log and hold the package until
                      the resident retrieves it.
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Typography variant="h6">Resident Notification</Typography>
                    <Typography variant="body1">
                      The concierge will notify the resident via email or phone when a package has been received.
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Typography variant="h6">Pickup Hours</Typography>
                    <Typography variant="body1">
                      Packages can be picked up from the front desk during the following hours: Monday-Friday, 9am-5pm.
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </Grid>
            <Grid item lg={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Delivery Notification
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Please fill out the form below to notify the building concierge of your delivery.
              </Typography>
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Name" id="name" placeholder="Enter your name" fullWidth />
                <TextField label="Apartment Number" id="apartment" placeholder="Enter your apartment number" fullWidth />
                <TextField label="Contact Information" id="contact" placeholder="Enter your phone or email" fullWidth />
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="footer" py={6} bgcolor="gray.900">
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="inherit">
            &copy; 2024 Acme Building. All rights reserved.
          </Typography>
          <nav>
            <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
              <ListItem sx={{ width: 'auto' }}>
                <Link href="#" prefetch={false} passHref>
                  <Typography variant="body2" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    Privacy Policy
                  </Typography>
                </Link>
              </ListItem>
              <ListItem sx={{ width: 'auto' }}>
                <Link href="#" prefetch={false} passHref>
                  <Typography variant="body2" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    Terms of Service
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </nav>
        </Container>
      </Box>
    </Box>
  );
};
