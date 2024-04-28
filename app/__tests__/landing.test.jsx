import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LandingPage from '../[locale]/page';

//Unit test for page.jsx file that corresponds to the public landing page (when a user isn't registered or logged in)
describe('LandingPage', () => {
  it('renders the heading', () => {
    render(<LandingPage />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Welcome to My Landing Page!');
  });

  it('renders the body text', () => {
    render(<LandingPage />);

    const bodyText = screen.getByText('This is a simple landing page built with React and Material UI.');

    expect(bodyText).toBeInTheDocument();
  });

  it('renders the Learn More button', () => {
    render(<LandingPage />);

    const learnMoreButton = screen.getByRole('button', { name: 'Learn More' });

    expect(learnMoreButton).toBeInTheDocument();
  });
});