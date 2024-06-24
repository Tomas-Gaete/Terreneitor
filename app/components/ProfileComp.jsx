"use client";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";

export function ProfileComponent({data =[],}) {
  const { t } = useTranslation("common", {
keyPrefix: "profile_view",
});
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      bgcolor="background.default"
    >
      <Card 
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar 
            src="/placeholder-user.jpg" 
            sx={{ width: 80, height: 80 }}
          >
            Avatar
          </Avatar>
          <Box textAlign="center">
            <Typography variant="h5" component="h2" fontWeight="bold">
            {data[0].name}
            </Typography>
            <Typography color="textSecondary">
            {data[0].email}
            </Typography>
            <Typography>
            {t("role")}
            </Typography>
            <Typography color="textSecondary">
            {data[0].description}
            </Typography>
            
          </Box>
          <Grid container spacing={2} width="100%">
            <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" fontWeight="medium">
              {t("residence")}
              </Typography>
              <Typography variant="body1" fontWeight="medium">
              {data[0].residence}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary" fontWeight="medium">
                {t("phone")}
              </Typography>
              <Typography variant="body1">
              {data[0].cellphone}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}