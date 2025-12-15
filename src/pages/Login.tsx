import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLock } from 'react-icons/fi';
import AnimatedBackground from '../components/AnimatedBackground';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciales incorrectas' + err);
    }
  };

  return (
    <div className="min-h-screen bg-black relative text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Fondo animado tipo halo */}
      <AnimatedBackground />

      <div className="z-10 flex flex-col md:flex-row w-full max-w-6xl">
        {/* Formulario */}
        <div className="md:w-1/2 bg-black/60 backdrop-blur-md p-10 rounded-2xl shadow-xl">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white/10 rounded-full p-4">
              <FiUser size={40} className="text-purple-400" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-between text-sm text-gray-400">
              <label>
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="hover:underline">Forgot your password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition rounded-md font-semibold"
            >
              Login
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>
        </div>

        {/* Texto lateral */}
        <div className="md:w-1/2 flex flex-col justify-center items-center mt-10 md:mt-0 text-center px-4">
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome.</h1>
          <p className="text-gray-400 max-w-md">
            Accede a tu cuenta y descubre un universo de posibilidades.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="text-purple-400 hover:underline">
              Sign up new
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
