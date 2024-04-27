import '@testing-library/jest-dom';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import { signOut } from "@/auth"; 
import Dashboard from '../[locale]/(private)/dashboard/page';

// Mock the signOut function
jest.mock('../../auth', () => ({
  signOut: jest.fn(),
}));

describe('Dashboard component', () => {
  it('should render the dashboard and sign out when the button is clicked', async () => {
    // Render the Dashboard component
    const { getByText } = render(<Dashboard />);

    // Find the button element and click it
    fireEvent.click(getByText('Click me!'));

    // Check if signout function was called with the correct redirect
    waitFor(() => expect(signOut).toHaveBeenCalled({ redirectTo: '/en/login' }));
  });
});
