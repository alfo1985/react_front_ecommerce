import type { Order } from "../models/Order ";

const API = "http://localhost:3000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    Authorization: `${token}`, // ajusta si no usas Bearer
    "Content-Type": "application/json",
  };
};

// Crear orden (checkout)
export const createOrder = async (): Promise<Order> => {
  const response = await fetch(`${API}/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Error al crear la orden");
  return response.json();
};

// Listar todas las órdenes del usuario autenticado
export const listOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${API}/orders`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Error al listar las órdenes");
  return response.json();
};

// Obtener una orden específica por id (incluye products y events)
export const getOrderById = async (id: number): Promise<Order> => {
  const response = await fetch(`${API}/orders/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Error al obtener la orden");
  return response.json();
};

// Cancelar una orden (cambia su status a CANCELLED)
export const cancelOrder = async (id: number): Promise<Order> => {
  const response = await fetch(`${API}/orders/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status: "CANCELLED" }),
  });
  if (!response.ok) throw new Error("Error al cancelar la orden");
  return response.json();
};

// Cambiar estado de la orden (para admin o si habilitas)
export const changeOrderStatus = async (id: number, status: string): Promise<Order> => {
  const response = await fetch(`${API}/orders/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Error al cambiar estado de la orden");
  return response.json();
};
