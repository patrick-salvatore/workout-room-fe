import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

afterAll(() => cleanup);
