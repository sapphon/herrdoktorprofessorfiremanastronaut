import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {aggregateDealership2Data} from "./converter";

test('ya boi aggregates the correct count', () => {
  let testData = [{vin:"123", description: "Arrive"},
    {vin:"123", description: "Complete"},
    {vin:"456", description: "Arrive"},
    {vin:"456", description: "Wrench"},
    {vin:"789", description: "Arrive"}]

  let expectation = {
    "123":["Arrive", "Complete"],
    "456":["Arrive", "Wrench"],
    "789":["Arrive"]
  };

  let actual = aggregateDealership2Data(testData);
  expect(Object.keys(actual).length).toBe(3);
  expect(expectation).toEqual(actual);
});
