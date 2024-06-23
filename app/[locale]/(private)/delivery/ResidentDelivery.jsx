import React from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ResidentDelivery() {
    
  return (
      <Box component="main" flex={1} p={3} display="grid" gap={2}>
        <Box display="grid" gap={1}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" component="h2" fontWeight="bold">Delivered Packages</Typography>
            <Button variant="outlined" size="small">View All</Button>
          </Box>
          <Box display="grid" gap={2} gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}>
            <PackageCard courier="Amazon" trackingNumber="1Z999AA1234567890" apartment="Apartment 101" deliveryDate="June 23, 2024" />
            <PackageCard courier="FedEx" trackingNumber="1Z999AA1234567891" apartment="Apartment 102" deliveryDate="June 22, 2024" />
            <PackageCard courier="USPS" trackingNumber="1Z999AA1234567892" apartment="Apartment 103" deliveryDate="June 21, 2024" />
            <PackageCard courier="UPS" trackingNumber="1Z999AA1234567893" apartment="Apartment 104" deliveryDate="June 20, 2024" />
            <PackageCard courier="DHL" trackingNumber="1Z999AA1234567894" apartment="Apartment 105" deliveryDate="June 19, 2024" />
            <PackageCard courier="FedEx" trackingNumber="1Z999AA1234567895" apartment="Apartment 106" deliveryDate="June 18, 2024" />
            <PackageCard courier="USPS" trackingNumber="1Z999AA1234567896" apartment="Apartment 107" deliveryDate="June 17, 2024" />
            <PackageCard courier="UPS" trackingNumber="1Z999AA1234567897" apartment="Apartment 108" deliveryDate="June 16, 2024" />
          </Box>
        </Box>
      </Box>
  );
}

function PackageCard({ courier, trackingNumber, apartment, deliveryDate }) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="medium">{courier}</Typography>
          <Typography variant="body2" color="text.secondary">Tracking #: {trackingNumber}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Box>
            <Typography fontWeight="medium">{apartment}</Typography>
            <Typography variant="body2" color="text.secondary">Delivered on {deliveryDate}</Typography>
          </Box>
          <Button variant="outlined" size="small">Picked Up</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
