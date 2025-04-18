export type product = {
  id: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  brand: string;
  freeShipping: boolean;
  price: number;
  image: string;
  rating: number;
  howToUse: string;
  ingredients: string[];
};

export type cartItem = {
  product: product;
  quantity: number;
};