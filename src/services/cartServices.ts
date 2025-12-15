import type { CartItem } from "../models/CartItem";

const API = "http://localhost:3000/api";

export const getCart = async (): Promise<CartItem[]> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API}/carts`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener el carrito");
  const json = await response.json();
  // Ajustar según respuesta real del backend:
  return json.data ?? json; // si tu API no usa "data", devolver json directamente
};
export const addProductToCart = async (
  productId: number,
  quantity: number
): Promise<CartItem> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API}/carts`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) throw new Error("Error al agregar el producto al carrito");
  const json = await response.json();
  return json.data ?? json; // idem
};

export const changeQuantity = async (
  productId: number, 
  quantity: number
): Promise<CartItem> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API}/carts/${productId}`, {
    method: "PATCH", // usa PATCH para actualización parcial
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }), // productId no hace falta porque va en la URL
  });
  if (!response.ok) throw new Error("Error al cambiar la cantidad del producto");
  const json = await response.json();
  return json.data ?? json;
};