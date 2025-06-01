export interface Feature {
  name: string;
  description: string;
  price: number;
  increment: number;
}

export interface FeatureBought {
  name: string;
  quantityBought: number;
}