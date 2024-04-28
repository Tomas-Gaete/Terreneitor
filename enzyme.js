import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

const Adapter = require('enzyme-adapter-react-18')

Enzyme.configure({ adapter: new Adapter() });