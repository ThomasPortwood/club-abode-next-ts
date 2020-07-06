import React from 'react';
import {render} from '@testing-library/react';

import Home from '../../pages';

describe('Home', () => {
  test('renders App component', () => {
    render(<Home allPostsData={[]}/>);
  });
});