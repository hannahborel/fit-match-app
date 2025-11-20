import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Home from '../../src/app/(protected)/(tabs)/home';

describe('Home', () => {
  it('renders the welcome message', () => {
    render(<Home />);
    const welcomeMessage = screen.getByText(
      'Open up App.tsx to start working on your app!',
    );
    expect(welcomeMessage).toBeTruthy();
  });
});

export default {};
