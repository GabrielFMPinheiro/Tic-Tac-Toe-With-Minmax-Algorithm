import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const onClick = jest.fn();
describe('In Button Component', () => {
  beforeEach(() => {
    render(<Button name={'testClass'} value={'testName'} event={onClick} />);
  });
  it('should have the correct name', () => {
    let btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('testName');
  });

  it('should have the correct class', () => {
    let btn = screen.getByRole('button');
    expect(btn).toHaveClass('testClass');
  });

  it('should call a function when it is clicked', () => {
    let btn = screen.getByRole('button');
    userEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });
});
