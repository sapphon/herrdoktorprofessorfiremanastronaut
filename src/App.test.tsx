import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('ya boi renders', () => {
  const { getByText } = render(<App />);
  expectPresence(getByText, /Not Started/i);
  expectPresence(getByText, /Work in Progress/i);
  expectPresence(getByText, /Complete/i);
});

function expectPresence(searchMethod: (r: RegExp) => Node, searchParameter: RegExp){
  expect(searchMethod(searchParameter)).toBeInTheDocument();
}

test('ya boi is correct', () => {

});
