import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './index';

describe('Navbar component', () => {
  it('renders without crashing', () => {
    expect(Nav).toBeDefined();
  });

  it('should have a button component', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );

    const btnComponent = getByTestId('btnComponent');

    expect(btnComponent).toBeDefined();
  });
});
