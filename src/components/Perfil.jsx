import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
    } else {
      const fetchUsuario = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setUsuario(data);
        } catch (error) {
          console.error('Error fetching usuario:', error);
          setError('Hubo un problema al obtener los datos del usuario.');
        }
      };

      fetchUsuario();
    }
  }, [navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-200 bg-gray-800 shadow-lg bg-clip-border">
      <div className="mx-4 mt-4 overflow-hidden text-gray-200 bg-gray-800 bg-clip-border">
        <h5 className="block font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-white">
          Perfil del Usuario
        </h5>
        <p className="block mt-1 font-sans text-lg antialiased font-normal leading-relaxed text-gray-300">
          Información general del usuario
        </p>
        <div className="mt-4">
          <p><strong>Nombre:</strong> {usuario.name}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          {/* Agrega más campos según sea necesario */}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
