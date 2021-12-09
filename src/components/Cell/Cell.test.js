import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Cell from './Cell';

const onClick = jest.fn();
describe('In Cell Component to player "X"', () => {
  beforeEach(() => {
    render(<Cell id={1} eventHandler={onClick} value={1} />);
  });
  it('should render the correct image', () => {
    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'x.png');
  });

  it('should have the correct id', () => {
    const img = screen.getByTestId('cell-container');

    expect(img).toHaveAttribute('id', '1');
  });

  it('should call a function when it is clicked', () => {
    const img = screen.getByRole('img');
    userEvent.click(img);

    expect(onClick).toHaveBeenCalled();
  });
});

describe('In Cell Component to player "O"', () => {
  beforeEach(() => {
    render(<Cell id={2} eventHandler={onClick} value={2} />);
  });
  it('should render the correct image', () => {
    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'o.png');
  });

  it('should have the correct id', () => {
    const img = screen.getByTestId('cell-container');

    expect(img).toHaveAttribute('id', '2');
  });

  it('should call a function when it is clicked', () => {
    const img = screen.getByRole('img');
    userEvent.click(img);

    expect(onClick).toHaveBeenCalled();
  });
});
