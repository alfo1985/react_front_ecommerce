import { useEffect, useState } from "react";
import type { Product, ProductDB } from "../models/Product"; // <-- ahora usamos ambos
import { getProducts, updateProduct } from "../services/productsService";
import Layout from '../components/Layout';

const ProductsPage = () => {
  const [productsTotal, setProductsTotal] = useState<ProductDB[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar productos al inicio
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProductsTotal(data); // <-- data viene como ProductDB[]
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Abrir modal con producto seleccionado
  const handleEdit = (product: ProductDB) => {
    // Para editar solo necesitamos los campos básicos
    const { id, name, description, price, tags } = product;
    setSelectedProduct({ id, name, description, price, tags });
    setIsOpen(true);
  };

  // Guardar cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct) return;

    try {
      const updated = await updateProduct(selectedProduct.id, selectedProduct);

      // actualizar lista en memoria
      setProductsTotal((prev) =>
        prev.map((p) =>
          p.id === updated.id ? { ...p, ...updated } : p
        )
      );

      setIsOpen(false); // cerrar modal
    } catch (error) {
      alert("Error al actualizar producto, intenta de nuevo");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-purple-500">Listado de Productos</h1>
        <ul className="grid gap-4">
          {productsTotal.map((product) => (
            <li
              key={product.id}
              className="p-4 rounded-xl bg-white shadow-lg border border-gray-200 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-purple-700">{product.name}</h2>
                <span className="text-gray-500 text-sm">
                  {new Date(product.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-700">
                <span className="font-semibold">Precio:</span> ${product.price}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Fecha Actualizacion:</span> {product.updatedAt}
              </p>


              {product.tags && (
                <p className="text-gray-700">
                  <span className="font-semibold">Tags:</span> {product.tags}
                </p>
              )}

              <div className="flex justify-end mt-3">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-800"
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Modal */}
        {isOpen && selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-2xl w-96 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Editar Producto</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  className="p-2 rounded bg-gray-800 border border-gray-600"
                />

                <textarea
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  className="p-2 rounded bg-gray-800 border border-gray-600"
                />

                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="p-2 rounded bg-gray-800 border border-gray-600"
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-800"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
