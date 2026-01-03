import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import type { CartItem } from "../models/CartItem";
import {
  getCart,
  changeQuantity
} from "../services/cartServices";

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error("Error cargando carrito:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 HANDLER (usa cartItem.id)
  const handleChangeQuantity = async (
    cartItemId: number,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) return;

    // 1️⃣ UI inmediata
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // 2️⃣ sincronizar backend
    try {
      await changeQuantity(cartItemId, newQuantity);
    } catch (err) {
      console.error("Error cambiando cantidad:", err);
      fetchCart(); // rollback
    }
  };

  // 💰 TOTAL GENERAL
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (loading) return <Layout>Cargando carrito...</Layout>;

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-500 mb-6">
          🛒 Carrito
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                >
                  {/* INFO PRODUCTO */}
                  <div>
                    <h2 className="text-lg font-semibold text-purple-700">
                      {item.product.name}
                    </h2>

                    <p className="text-gray-600">
                      Precio: ${item.product.price}
                    </p>

                    <p className="text-gray-800 font-bold">
                      Subtotal: $
                      {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* CONTROLES */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleChangeQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 bg-gray-300 rounded text-lg"
                    >
                      -
                    </button>

                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleChangeQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                      className="px-3 py-1 bg-gray-300 rounded text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-6 p-4 bg-purple-100 rounded-xl flex justify-between items-center">
              <span className="text-lg font-bold text-purple-700">
                Total
              </span>
              <span className="text-xl font-bold text-purple-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
