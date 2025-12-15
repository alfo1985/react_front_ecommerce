import { createContext, useContext, useState,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';


interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => { //Esto envuelve toda la app y da acceso al login
  const [token, setToken] = useState(localStorage.getItem('authToken'));//Aquí se carga el token desde el almacenamiento local al estado
  const navigate = useNavigate();//redirecciona al usuario

  const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Login incorrecto');
    }

    const data = await res.json();
    localStorage.setItem('authToken', data.token);
    setToken(data.token);
    navigate('/products');//Si es exitoso: guarda el token en localStorage, lo actualiza en state, y redirige a /products
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/login'); //Borra el token - Redirige al login.
  };

  const value = useMemo(() => ({ token, login, logout }), [token]);

//Esto hace que el componente dentro de AuthProvider pueda usar token, login y logout
  return (
    <AuthContext.Provider value={value}> 
      {children}
    </AuthContext.Provider>
  );
};

//hook personalizado
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthContext must be used within AuthProvider');
  return ctx;
};