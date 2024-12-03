import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      navigate('/'); // Si el usuario ya está autenticado, redirigir a la raíz
    }
  }, [navigate]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('¡Error de inicio de sesión! Por favor, verifica tus credenciales.');
      }

      const data = await response.json();
      // Almacenar el token JWT en localStorage directamente
      localStorage.setItem('auth_token', data.token);
      setTimeout(() => {
        setLoading(false);
        navigate('/'); // Redirigir al Layouts
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError('¡Error de inicio de sesión! Por favor, verifica tus credenciales.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-800 h-screen">
      <div className="bg-white bg-opacity-95 rounded-lg p-12 shadow-lg w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8">Iniciar Sesión</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <p className="text-white text-5xl font-bold">{dots}</p>
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="username"
              className="block mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="block mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="block mb-5">
            <label htmlFor="remember_me" className="inline-flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                name="remember"
              />
              <span className="ml-2 text-sm text-gray-700">Recuérdame</span>
            </label>
          </div>
          <div className="flex items-center justify-between mb-5">
            <a className="text-sm text-gray-700 hover:text-gray-900" href="/forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="mt-5 text-center">
          <span className="text-sm text-gray-700">¿No tienes una cuenta? </span>
          <a href="/register" className="text-green-600 hover:text-green-900 font-semibold">Regístrate aquí</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
