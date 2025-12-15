import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../models/Product";
import { addProduct } from "../services/productsService";



export default function AddProductPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Creamos el producto con las fechas actuales
    const newProduct: Omit<Product, "id"> = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      tags: formData.tags
      //createdAt: new Date(),
     // updatedAt: new Date(),
    };


    try {
      const addProd = await addProduct(newProduct);
      console.log("addProd", addProd);

      if (addProd) {
        navigate("/products");
      } else {
        console.error("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-2xl shadow-lg text-white">
      <h1 className="text-2xl font-bold mb-6 text-purple-400">
        Agregar Producto
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Ingresar Etiquetas"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
}
