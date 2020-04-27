import React from 'react';
import Calendar from './index';
import { render } from '@testing-library/react';

describe('<Calendar/> View component', () => {
  const wrapper = render(<Calendar />);

  expect(wrapper).toBeDefined();
});
