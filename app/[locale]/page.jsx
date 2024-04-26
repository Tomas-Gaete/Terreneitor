import { Container, Typography, Button } from '@mui/material';

/*
    * This is the landing page for the user to see upon signing in. It will be the first page the user sees upon logging in.

*/

// * This function displays a welcome message and a button for the user to learn more about the page.
const LandingPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to My Landing Page!
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a simple landing page built with React and Material UI.
      </Typography>
      <Button variant="contained" >
        Learn More
      </Button>
    </Container>
  );
};

export default LandingPage;