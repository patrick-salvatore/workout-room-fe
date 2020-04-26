import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SideNav from './index';

describe('Navbar component', () => {
  it('renders without crashing', () => {
    expect(SideNav).toBeDefined();
  });
});
