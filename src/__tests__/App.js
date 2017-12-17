import React from 'react';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');

  shallow(<App classes={{ root: '', navButton: '' }} push={location => {}} />);
});
