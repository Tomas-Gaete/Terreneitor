import React from 'react';
import { Card, CardHeader, CardContent, Avatar, Grid, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

export default function ResidentPortal() {
  return (
    
      <Container component="main" style={{ flex: 1, padding: '16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Welcome to the Resident Portal
          </Typography>
          <Typography variant="body1" color="secondary">
            Manage your building information and stay connected with your community.
          </Typography>
        </div>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card>
              <CardHeader title="Packages Pending Pickup" />
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <LocalShippingIcon style={{ marginRight: '8px' }} />
                  <div>
                    <Typography variant="body1">Package from Amazon</Typography>
                    <Typography variant="body2" color="textSecondary">Arrived on June 15, 2023</Typography>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <LocalShippingIcon style={{ marginRight: '8px' }} />
                  <div>
                    <Typography variant="body1">Package from Walmart</Typography>
                    <Typography variant="body2" color="textSecondary">Arrived on June 18, 2023</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Card>
              <CardHeader title="Parking Space Occupancy" />
              <CardContent>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <LocalParkingIcon style={{ marginRight: '8px' }} />
                  <div>
                    <Typography variant="body1">Visitor Parking</Typography>
                    <Typography variant="body2" color="textSecondary">90% occupied</Typography>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <LocalParkingIcon style={{ marginRight: '8px' }} />
                  <div>
                    <Typography variant="body1">Overdue Parking</Typography>
                    <Typography variant="body2" color="textSecondary">0 vehicles to remove</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Card>
              <CardHeader title="Visitors" />
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Avatar style={{ marginRight: '8px' }} src="/placeholder-user.jpg" alt="Visitor" />
                  <div>
                    <Typography variant="body1">Sarah Lee</Typography>
                    <Typography variant="body2" color="textSecondary">Visiting Unit 101</Typography>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Avatar style={{ marginRight: '8px' }} src="/placeholder-user.jpg" alt="Visitor" />
                  <div>
                    <Typography variant="body1">David Kim</Typography>
                    <Typography variant="body2" color="textSecondary">Visiting Unit 201</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

  );
}
