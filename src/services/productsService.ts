import type { Product, ProductDB } from "../models/Product";

const API = "http://localhost:3000/api";

export const getProducts = async (): Promise<ProductDB[]> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API}/products`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) throw new Error("Token inválido o expirado");
  const json = await response.json();
  console.log("json de productos", json);
  return json.data;
};

export const addProduct = async (
  product: Omit<Product, "id">
): Promise<ProductDB> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API}/products`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product), // ✅ sin createdAt ni updatedAt
  });

  if (!response.ok)
    throw new Error("Error al agregar el producto desde el servicio");

  const json = await response.json();
  return json as ProductDB; // ✅ lo que devuelve el backend sí incluye las fechas
};

// 🔹 Editar un producto
export const updateProduct = async (
  id: number,
  product: Partial<Product>
): Promise<Product> => {
  const token = localStorage.getItem("authToken");
  console.log("token", token);
  console.log("product", product);

  const { id: _, ...productData } = product;
  const response = await fetch(`${API}/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) throw new Error("Error al actualizar el producto");
  const json = await response.json();
  return json;
};

// Obtener un producto por id
export const getProductById = async (id: number): Promise<Product> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API}/products/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) throw new Error("Error al obtener el producto");
  const json = await response.json();
  console.log("jsonTotal", json.data);
  return json;
};
