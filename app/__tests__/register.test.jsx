import '@testing-library/jest-dom';
import SignUp from '../[locale]/register/page';
import { fireEvent } from '@testing-library/react';

describe('SignUp component', () => {
  it('should handle form submission and log email and password', () => {
    // Mock FormData
    global.FormData = jest.fn(() => ({
      get: jest.fn().mockReturnValueOnce('test@example.com').mockReturnValueOnce('password123'),
    }));

    // Mock console.log
    const originalLog = console.log;
    console.log = jest.fn();

    // Render the SignUp component
    const signUp = new SignUp();
    
    // Create a mock event object
    const event = { 
      preventDefault: jest.fn(), 
      currentTarget: { 
        getAttribute: jest.fn(), 
      } 
    };

    // Simulate form submission (not working yet so it isn't implemented in the unit test)
    
  });
});
