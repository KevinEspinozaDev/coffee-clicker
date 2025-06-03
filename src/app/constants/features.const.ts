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
    price: 8000,
    description: 'Adds +10 Coffee',
    increment: 10
  },
  {
    name: 'Coffee Machine',
    price: 18000,
    description: 'Adds +20 Coffee',
    increment: 20
  },
  {
    name: 'Automatic Coffee Machine',
    price: 50000,
    description: 'Adds +50 Coffee',
    increment: 50
  },
  {
    name: 'Little Coffee Shop',
    price: 200000,
    description: 'Adds +100 Coffee',
    increment: 100
  },
  {
    name: 'Coffee Shop',
    price: 500000,
    description: 'Adds +200 Coffee',
    increment: 200
  },
  {
    name: 'Great Coffee Shop',
    price: 1000000,
    description: 'Adds +500 Coffee',
    increment: 500
  }
];

export enum FeaturesNamesEnum {
  COFFEE = 'Coffee',
  COFFEE_CUP = 'Coffee Cup',
  COFFEE_JAR = 'Coffee Jar',
  COFFEE_BOX = 'Coffee Box',
  COFFEE_BAG = 'Coffee Bag',
  COFFEE_MACHINE = 'Coffee Machine',
  AUTOMATIC_COFFEE_MACHINE = 'Automatic Coffee Machine',
  LITTLE_COFFEE_SHOP = 'Little Coffee Shop',
  COFFEE_SHOP = 'Coffee Shop',
  GREAT_COFFEE_SHOP = 'Great Coffee Shop'
}

