export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string;
};

export type ProductDB = Product & {
  createdAt: string;
  updatedAt: string;
};