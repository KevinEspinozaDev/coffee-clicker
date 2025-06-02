import { LifeFeature } from "../tab2/interfaces/life-feature.interface";

export const LIFE_FEATURES: LifeFeature[] = [
  {
    name: 'Little dirty garage',
    description: 'You live in a little dirty garage',
    price: 4999
  },
  {
    name: 'Old tiny room',
    description: 'You live in an old tiny room',
    price: 19999
  },
];

export enum LifeFeaturesNamesEnum {
  LITTLE_DIRTY_GARAGE = 'Little dirty garage',
  OLD_TINY_ROOM = 'Old tiny room',
}
