import type { Product } from "./Product";

export type OrderProduct = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product; // reusa tu Product
};

export type OrderEvent = {
  id: number;
  orderId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: number;
  userId: number;
  netAmount: string; // Decimal -> string
  address: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  products: OrderProduct[];
  events: OrderEvent[];
};
