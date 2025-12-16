export const BOOSTS = [
  {
    id: 'x2',
    type: 'multiplier',
    cost: 1, // test. change in production
    factor: 2,
  },
  {
    id: 'x3',
    type: 'multiplier',
    cost: 1, // test. change in production
    factor: 3,
    requires: 'x2',
  },
  {
    id: 'x5',
    type: 'multiplier',
    cost: 1, // test. change in production
    factor: 5,
    requires: 'x3',
  },
  {
    id: 'dvd',
    type: 'visual',
    cost: 1, // test. change in production
    requires: 'x3',
    visual: 'dvd',
  },
];
