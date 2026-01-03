import { useEffect, useState } from "react";
import type { ProductDB } from "../models/Product";
import { getProducts } from "../services/productsService";
import { addProductToCart } from "../services/cartServices";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function ProductsShopPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductDB[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId: number) => {
    try {
      await addProductToCart(productId, 1); // cantidad 1 por defecto
        navigate("/cart");
      console.log("Producto agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-purple-500">Tienda</h1>
        <ul className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="p-4 rounded-xl bg-white shadow-lg border border-gray-200 flex flex-col gap-2"
            >
              <h2 className="text-lg font-bold text-purple-700">
                {product.name}
              </h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-900 font-semibold">
                Precio: ${product.price}
              </p>
              <button
                onClick={() => addToCart(product.id)}
                className="bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-800 mt-2"
              >
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
