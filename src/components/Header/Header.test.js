import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('In Header Component', () => {
  it('should have the correct name', () => {
    render(<Header />);
    let header = screen.getByRole('heading', { name: /tic tac toe/i });
    expect(header).toBeInTheDocument();
  });
});
