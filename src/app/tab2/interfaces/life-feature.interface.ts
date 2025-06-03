export interface LifeFeature {
  name: string;
  description: string;
  price: number;
  increasePerSecond: number;
}

export interface LifeFeatureBought {
  name: string;
  quantityBought: number;
}