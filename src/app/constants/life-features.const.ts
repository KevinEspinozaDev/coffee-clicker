import { LifeFeature } from "../tab2/interfaces/life-feature.interface";

export const LIFE_FEATURES: LifeFeature[] = [
  {
    name: 'Little dirty garage',
    description: 'You live in a little dirty garage. +1 coffee per second',
    price: 9999,
    increasePerSecond: 1
  },
  {
    name: 'Old tiny room',
    description: 'You live in an old tiny room',
    price: 19999,
    increasePerSecond: 2
  },
  {
    name: 'Single room',
    description: 'A modest but clean single room. +5 coffee per second',
    price: 49999,
    increasePerSecond: 5
  },
  {
    name: 'Modest studio',
    description: 'A modest studio with a small kitchen and a bathroom. +10 coffee per second',
    price: 199999,
    increasePerSecond: 10
  },
  {
    name: 'Big studio',
    description: 'A big studio with a big kitchen, a big bathroom and balcony. +50 coffee per second',
    price: 499999,
    increasePerSecond: 50
  },
];

export enum LifeFeaturesNamesEnum {
  LITTLE_DIRTY_GARAGE = 'Little dirty garage',
  OLD_TINY_ROOM = 'Old tiny room',
  SINGLE_ROOM = 'Single room',
  MODEST_STUDIO = 'Modest studio',
  BIG_STUDIO = 'Big studio',
}
