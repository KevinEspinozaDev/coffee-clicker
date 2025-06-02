import { Feature } from "../tab2/interfaces/feature.interface";

export const FEATURES: Feature[] = [
  {
    name: 'Coffee',
    price: 100,
    description: 'Adds +1 Coffee',
    increment: 1
  },
  {
    name: 'Coffee Cup',
    price: 300,
    description: 'Adds +2 Coffee',
    increment: 2
  },
  {
    name: 'Coffee Jar',
    price: 1000,
    description: 'Adds +3 Coffee',
    increment: 3
  },
  {
    name: 'Coffee Bag',
    price: 3000,
    description: 'Adds +5 Coffee',
    increment: 5
  },
  {
    name: 'Coffee Box',
    price: 5000,
    description: 'Adds +10 Coffee',
    increment: 10
  },
  {
    name: 'Coffee Machine',
    price: 15000,
    description: 'Adds +20 Coffee',
    increment: 20
  }
];

export enum FeaturesNamesEnum {
  COFFEE = 'Coffee',
  COFFEE_CUP = 'Coffee Cup',
  COFFEE_JAR = 'Coffee Jar',
  COFFEE_BOX = 'Coffee Box',
  COFFEE_BAG = 'Coffee Bag',
  COFFEE_MACHINE = 'Coffee Machine'
}

