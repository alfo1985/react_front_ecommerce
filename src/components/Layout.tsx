import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();

  return (
    <div>
      <nav className="bg-gradient-to-r from-[#3b0a59] to-black text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex space-x-4">
          <Link
            to="/products"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Productos
          </Link>
          <Link
            to="/add-product"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Adicionar Producto
          </Link>
          <Link
            to="/about"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Acerca de
          </Link>
          {/* Agrega más links aquí si deseas */}
          <Link
            to="/cart"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Carrito
          </Link>
          <Link
            to="/orders"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Mis Pedidos
          </Link>
          <Link
            to="/shop"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Tienda
          </Link>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Cerrar sesión
        </button>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
