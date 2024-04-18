import { Container, Typography, Button } from '@mui/material';

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