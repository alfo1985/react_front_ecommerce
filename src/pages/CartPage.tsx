import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import type { CartItem } from "../models/CartItem";
import { getCart } from "../services/cartServices";

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("token de carrito", token);
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error("Error cargando carrito:", err);
    } finally {
      setLoading(false);
    }
  };

  const changeQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) return; // no permitir valores negativos
    try {
      await changeQuantity(id, quantity);
      fetchCart();
    } catch (err) {
      console.error("Error cambiando cantidad:", err);
    }
  };


  if (loading) return <Layout>Cargando carrito...</Layout>;

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-500 mb-4">🛒 Carrito</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-purple-700">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-600">
                    ${item.product.price} x {item.quantity}
                  </p>
                  <p className="text-gray-800 font-bold">
                    Total: ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => changeQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => changeQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;