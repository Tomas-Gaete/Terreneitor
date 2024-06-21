"use client"; // This is necessary for client-side components in Next.js 13+

import React, { useState } from "react";
import Link from "next/link";
import { Box, Container, Grid, Typography, List, ListItem, TextField, Button, Autocomplete } from "@mui/material";
import { useTranslation } from "react-i18next";
import { send_message } from "@components/whatsapp_component";
import { createFilterOptions } from "@mui/material/Autocomplete";
import PropTypes from 'prop-types';

const filter = createFilterOptions();

export const Deliverycomponent = ({ residentName = [] }) => {
  const { t } = useTranslation("common", { keyPrefix: "deliverys" });

  const [resident_Name, setResidentName] = useState("");
  const [openName, setOpenName] = useState(false);
  const [resident, setResident] = useState({
    user_id: "",
    firstname: "",
    lastname: "",
  });

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
                <Autocomplete
                  id="residentName"
                  name="residentName"
                  inputProps={{ name: "residentName" }}
                  sx={{ mt: 2, width: 1 }}
                  disablePortal
                  freeSolo
                  forcePopupIcon={false}
                  noOptionsText={t("name_instruction")}
                  value={resident_Name}
                  open={openName}
                  onClose={() => setOpenName(false)}
                  options={residentName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("owner_name")}
                      id="name"
                      placeholder={t("name_instruction")}
                      InputLabelProps={{ color: "secondary" }}
                      fullWidth
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.label}
                    </li>
                  )}
                  onInputChange={(event, value) => {
                    setOpenName(value?.length > 0); // Set open to true when there's input
                  }}
                  onChange={(event, value) => {
                    if (value) {
                      setResidentName(value.inputValue ?? value.label);
                    } else {
                      setResidentName("");
                    }

                    // Keep both fields in sync
                    if (!value) {
                      setResident({
                        user_id: "",
                        firstname: "",
                        lastname: "",
                      });
                      return;
                    }
                    const exists = residentName.find((resident) => resident.id === value.id);
                    if (exists) {
                      setResident({
                        user_id: exists.id,
                        firstname: exists.label.split(' ')[0],
                        lastname: exists.label.split(' ')[1],
                      });
                    } else {
                      setTimeout(() => {
                        setResident({
                          user_id: value.inputValue ?? value.label,
                          firstname: "",
                          lastname: "",
                        });
                      });
                    }
                    setOpenName(false);
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
                <TextField label={t("owner_apartment")} id="apartment" placeholder={t("apartment_instruction")} fullWidth />
                <Button  
                  variant="contained" 
                  fullWidth 
                  onClick={send_message}
                >
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

Deliverycomponent.propTypes = {
  residentName: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
};

Deliverycomponent.defaultProps = {
  residentName: [],
};
