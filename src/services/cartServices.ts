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
  cartItemId: number,
  newQuantity: number
): Promise<CartItem> => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API}/carts/${cartItemId}`, {
    method: "PUT", // ✅ IGUAL QUE POSTMAN
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: newQuantity, // ✅ clave correcta
    }),
  });

  if (!response.ok) {
    throw new Error("Error al cambiar la cantidad del carrito");
  }

  return response.json();
};
