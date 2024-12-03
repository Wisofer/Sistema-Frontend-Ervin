import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-black to-gray-800 text-white p-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 md:mb-10">Bienvenido al Dashboard</h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8">Este es el panel principal donde puedes ver información importante y relevante para la gestión de tus actividades.</p>
      <div className="bg-gray-900 bg-opacity-90 p-6 sm:p-8 md:p-10 rounded-lg shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Información Adicional</h2>
        <ul className="list-disc list-inside">
          <li className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4">Estadísticas de uso detalladas y en tiempo real</li>
          <li className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4">Últimas actividades realizadas por los usuarios</li>
          <li className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4">Notificaciones recientes y alertas importantes</li>
          <li className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4">Accesos rápidos a funciones clave para mejorar la eficiencia</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
