"use client"; // This is necessary for client-side components in Next.js 13+

import React from "react";
import Link from "next/link";
import { Box, Container, Grid, Typography, List, ListItem, TextField, Button, AppBar, Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Deliverycomponent = () => {
  const { t } = useTranslation("common", { keyPrefix: "deliverys" });

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      
      <Box component="main" flex="1" py={12} px={6}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item lg={6}>
              <Typography variant="h4" component="h2" gutterBottom>
              {t("title")}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {t("general_info")}
              </Typography>
              <List>
                <ListItem>
                  <Box>
                    <Typography variant="h6">{t("front_desk")}</Typography>
                    <Typography variant="body1">
                      {t("front_desk_info")}
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Typography variant="h6">{t("resident_notification")}</Typography>
                    <Typography variant="body1">
                      {t("resident_notification_info")}
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Typography variant="h6">{t("pickup")}</Typography>
                    <Typography variant="body1">
                      {t("pickup_info")}
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </Grid>
            <Grid item lg={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                {t("notification")}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {t("notification_info")}
              </Typography>
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label={t("owner_name")} id="name" placeholder={t("name_instruction")} fullWidth />
                <TextField label={t("owner_apartment")} id="apartment" placeholder={t("apartment_instruction")} fullWidth />
                <Button type={t("apartment_instruction")} variant="contained" fullWidth>
                  {t("button")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="footer" py={6} bgcolor="gray.900">
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="inherit">
            &copy; 2024 Terreneitor. All rights reserved.
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
