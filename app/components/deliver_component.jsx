"use client"; // This is necessary for client-side components in Next.js 13+

import React, { useState } from "react";
import Link from "next/link";
import { Box, Container, Grid, Typography, List, ListItem, TextField, Button, Autocomplete, Card, CardHeader, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { createFilterOptions } from "@mui/material/Autocomplete";
import PropTypes from 'prop-types';
import { string } from "zod";
import { sql } from '@vercel/postgres';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { addPackage } from "@/app/lib/actions";



const filter = createFilterOptions();

export const Deliverycomponent = ({ residentName = [],}) => {
  const { t } = useTranslation("common", { keyPrefix: "deliverys" });

  const [resident_Name, setResidentName] = useState("");
  const [resident_Address, setResidentAddress] = useState("");
  const [openName, setOpenName] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  const [resident, setResident] = useState({
    user_id: "",
    firstname: "",
    lastname: "",
    residence_id: "",
    community_address: "",
    cellphone: "",
  });

  const handleAddPackage = async () => {
    const sender = "Amazon"; // Example sender
    const description = "Package from Amazon"; // Example description
    await addPackage(resident, sender, description);
  };

  
  
 
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
                      inputProps={{ ...params.inputProps,name: "residentName" }}
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
                        residence_id: "",
                        community_address: "",
                        cellphone: "",
                      });
                      return;
                    }
                    const exists = residentName.find((resident) => resident.id === value.id);
                    if (exists) {
                      setResident({
                        user_id: exists.id,
                        firstname: exists.label.split(' ')[0],
                        lastname: exists.label.split(' ')[1],
                        residence_id: exists.residence_id,
                        community_address: exists.address,
                        cellphone: exists.cellphone,
                      });
                    } else {
                      setTimeout(() => {
                        setResident({
                          user_id: value.inputValue ?? value.label,
                          firstname: "",
                          lastname: "",
                          residence_id: "",
                          community_address: "",
                          cellphone: "",
                        });
                      });
                    }
                    setOpenName(false);
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    return filtered;
                  }}
                />
                <Autocomplete
                  id="apartment"
                  name="residentapartment"
                  sx={{ mt: 2, width: 1 }}
                  disablePortal
                  freeSolo
                  forcePopupIcon={false}
                  noOptionsText={t("name_instruction")}
                  value={resident_Address}
                  open={openAddress}
                  onClose={() => setOpenAddress(false)}
                  options={residentName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("owner_apartment")}
                      inputProps={{ ...params.inputProps,name: "residentName" }}
                      id="name"
                      placeholder={t("apartment_instruction")}
                      InputLabelProps={{ color: "secondary" }}
                      fullWidth
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.address}
                    </li>
                  )}
                  onInputChange={(event, value) => {
                    setOpenAddress(value?.length > 0); // Set open to true when there's input
                  }}
                  onChange={(event, value) => {
                    if (value) {
                      setResidentAddress(value.inputValue ?? value.address);
                    } else {
                      setResidentAddress("");
                    }

                    // Keep both fields in sync
                    if (!value) {
                      setResident({
                        user_id: "",
                        firstname: "",
                        lastname: "",
                        residence_id: "",
                        community_address: "",
                        cellphone: "",
                      });
                      return;
                    }
                    const exists = residentName.find((resident) => resident.id === value.id);
                    if (exists) {
                      setResident({
                        user_id: exists.id,
                        firstname: exists.label.split(' ')[0],
                        lastname: exists.label.split(' ')[1],
                        residence_id: exists.residence_id,
                        community_address: exists.address,
                        cellphone: exists.cellphone,
                      });
                    } else {
                      setTimeout(() => {
                        setResident({
                          user_id: value.inputValue ?? value.address,
                          firstname: "",
                          lastname: "",
                          residence_id: "",
                          community_address: "",
                          cellphone: "",
                        });
                      });
                    }
                    setOpenAddress(false);
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    return filtered;
                  }}
                />
                <Button 
                   type = "submit"
                  variant="contained" 
                  fullWidth 
                  onClick={handleAddPackage}
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

export function ResidentDeliveryComponent({	pendingPackages,user})
{
  const { t } = useTranslation("common", {
		keyPrefix: "resident_delivery",
	});
  return(
    
    <Container component="main" style={{ flex: 1, padding: "16px" }}>
    <div style={{ textAlign: "center", marginBottom: "32px" }}>
      <Typography variant="h4" component="h1" color="primary" gutterBottom>
      {t("welcome")} {user}!
      </Typography>
      <Typography variant="body1" color="secondary">
      {t("subtitle")}
      </Typography>
    </div> 
    {pendingPackages.length === 0 ? (
  <Typography variant="body2" color="textSecondary">
    {t("no_packages")}
  </Typography>
) : (
  <Grid container spacing={2}>
    {pendingPackages.map((packageitem) => (
      <Grid item xs={12} sm={6} md={4} key={packageitem.id}>
        <Card>
          <CardHeader title={t("pending_packages")} />
          <CardContent
            sx={{
              minHeight: "22vh",
              maxHeight: "50vh",
            }}
          >
            <PackageItem data={packageitem} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)}   
      </Container>
  )
}
function PackageItem({ data }) {
	const { t } = useTranslation("translate-dashboard", {
		keyPrefix: "concierge",
	});
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				marginBottom: "8px",
			}}
		>
			<LocalShippingIcon style={{ marginRight: "8px" }} />
			<div>
				<Typography variant="body1">
					{t("package_for")} {data.recipient}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{t("sent_by")} {data.sender}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{t("arrived_on")} {data.drop_off}
				</Typography>
			</div>
		</div>
	);
}
Deliverycomponent.propTypes = {
  residentName: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
};


