import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import type { Order } from "../models/Order ";
import { cancelOrder, listOrders } from "../services/orderServices";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  try {
    const data = await listOrders(); // Llama al service
    setOrders(data);
  } catch (err) {
    console.error("Error cargando órdenes:", err);
  } finally {
    setLoading(false);
  }
};

   const cancelOrders = async (id: number) => {
    try {
      await cancelOrder(id);
      fetchOrders();
    } catch (err) {
      console.error("Error cancelando orden:", err);
    }
  };

  if (loading) return <Layout>Cargando órdenes...</Layout>;

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-500 mb-4">📑 Mis Órdenes</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No tienes órdenes registradas</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-purple-700">
                    Orden #{order.id}
                  </p>
                  <p className="text-gray-600">
                    Fecha: {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-800 font-bold">
                    Total: ${order.netAmount}
                  </p>
                  <p
                    className={`font-semibold ${
                      order.status === "CANCELLED"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    Estado: {order.status}
                  </p>
                </div>
                {order.status === "PENDING" && (
                  <button
                    onClick={() => cancelOrders(order.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Cancelar
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;