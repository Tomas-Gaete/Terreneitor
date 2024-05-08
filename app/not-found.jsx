"use client";
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import { Box } from '@mui/material';



const NotFoundPage = () => {

    //TODO: Add multi-language support
    return (
        <Container 
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Typography variant="h1" gutterBottom>404</Typography>
            <Typography variant="h4" gutterBottom>Página no encontrada</Typography>
            <div style={{ display: "flex", alignItems: "center", position:"absolute", bottom:0 , margin:10}}>
                <AdbIcon color="secondary" fontSize="medium" />
                <Box sx={{ display: "flex", alignItems: "center" }}>  
                <Typography variant="h5" color="primary" style={{ marginLeft: "0.5rem" }}>TERRENEITOR</Typography>
                </Box>
            </div>
        </Container>
    );
};

export default NotFoundPage;
