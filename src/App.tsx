import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { JSX } from "react";
import AddProductPage from "./pages/AddProductPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsShopPage from "./pages/ProductsShopPage";


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <AboutPage />
            </PrivateRoute>
          }
        />
         <Route
            path="/add-product"
            element={
              <PrivateRoute>
                  <AddProductPage />
              </PrivateRoute>
            }
          />
                  <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <ProductsShopPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;