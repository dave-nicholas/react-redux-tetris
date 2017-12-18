import React from 'react';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const app = shallow(
    <App classes={{ root: '', navButton: '' }} push={location => {}} />
  );
  expect(app).toMatchSnapshot();
});
