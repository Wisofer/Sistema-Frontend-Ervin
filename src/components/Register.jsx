import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      navigate('/'); // Si el usuario ya está autenticado, redirigir a la raíz
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar el formulario
    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors || 'Algo salió mal. Por favor, inténtalo de nuevo.');
      }

      const data = await response.json();
      // Almacenar el token y redirigir al Dashboard
      localStorage.setItem('auth_token', data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-800">
      <div className="bg-white bg-opacity-90 rounded-lg p-12 shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Regístrate</h1>
        {error && <p className="text-red-500 mb-4">{JSON.stringify(error)}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              autoComplete="name"
              className="block mt-1 w-full border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="block mt-1 w-full border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="block mt-1 w-full border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input
              id="password_confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              autoComplete="new-password"
              className="block mt-1 w-full border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <a className="underline text-sm text-gray-600 hover:text-gray-900" href="/login">
              ¿Ya tienes una cuenta?
            </a>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
