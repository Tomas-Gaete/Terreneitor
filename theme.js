'use client';
import { Red_Hat_Display } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

/*
    * This is the theme file for the app. It contains the color palette and typography for the app.
*/

const ibm_plex_mono = Red_Hat_Display({
    weight: ['variable'],
    subsets: ['latin'],
    display: 'swap',
    });


const islight = false;
const darkTheme = createTheme({
    palette:{
        mode: 'dark',
        primary: {
          main: '#F8BC18',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#4D9444',
        },
        warning: {
          main: '#FF9800',
        },
        error: {
          main: '#EA453C',
        },
        background: {
          default: '#17130B',
          paper: '#353027',
        },
    },
    typography: {
        fontFamily: ibm_plex_mono.style.fontFamily,
    },
});
const lightTheme = createTheme({
    palette:{
        mode: 'light',
        primary: {
          main: '#faa005',
        },
        secondary: {
          main: '#407538',
        },
        warning: {
          main: '#FF9800',
        },
        error: {
          main: '#D32F2F',
        },
        background: {
          default: '#F8FFFF', 
          paper: '#FFFFFF',  
        },
    },
    typography: {
        fontFamily: ibm_plex_mono.style.fontFamily,
    },

});


export {darkTheme, lightTheme};