import * as React from 'react';
import renderer from 'react-test-renderer';
import Navbar from '../navbar';

test('AppTitle', () => {
  const component = renderer.create(<Navbar />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});