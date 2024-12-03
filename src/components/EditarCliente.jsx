import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditarCliente = ({ cliente, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    codigo: cliente.codigo,
    nombres: cliente.nombres,
    apellidos: cliente.apellidos,
    cedula: cliente.cedula,
    telefono: cliente.telefono,
    codigo_pais: cliente.codigo_pais,
    servicio: cliente.servicio,
    plan: cliente.plan,
    sector: cliente.sector,
    estacion_base: cliente.estacion_base,
    tecnologia: cliente.tecnologia,
    estado: cliente.estado,
    fecha_inicio: cliente.fecha_inicio,
    fecha_finalizacion: cliente.fecha_finalizacion,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/clientes/${cliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      onSave(data);
      onClose();
      navigate('/obtenerUsuario');
      window.location.reload();
    } catch (error) {
      console.error('Error updating cliente:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl p-6 max-h-full overflow-y-auto"> {/* Añadido max-w-4xl para limitar el ancho máximo */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Editar Cliente</h2>
          <button className="text-white hover:text-gray-300" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Cambiado a grid-cols-1 para dispositivos pequeños */}
            <div>
              <label className="block text-sm font-medium text-white">Código:</label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Nombres:</label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Apellidos:</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Cédula:</label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Código País:</label>
              <select
                name="codigo_pais"
                value={formData.codigo_pais}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              >
                <option value="">Seleccione un código</option>
                <option value="505">505</option>
                <option value="506">506</option>
                <option value="1">1</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Servicio:</label>
              <select
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              >
                <option value="">Seleccione un servicio</option>
                <option value="IR">Internet Residencial</option>
                <option value="RER">Radio Enlace Residencial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Plan:</label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              >
                <option value="">Seleccione un plan</option>
                <option value="5 Mbps">5 Mbps</option>
                <option value="10 Mbps">10 Mbps</option>
                <option value="15 Mbps">15 Mbps</option>
                <option value="20 Mbps">20 Mbps</option>
                <option value="30 Mbps">30 Mbps</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Sector:</label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              >
                <option value="">Seleccione un sector</option>
                <option value="LP00">LP00</option>
                <option value="LP01">LP01</option>
                <option value="LP02">LP02</option>
                <option value="LP03">LP03</option>
                <option value="AMAT00">AMAT00</option>
                <option value="AMAT01">AMAT01</option>
                <option value="AMAT02">AMAT02</option>
                <option value="AMAT03">AMAT03</option>
                <option value="SB01">SB01</option>
                <option value="SB02">SB02</option>
                <option value="ELC00">ELC00</option>
                <option value="BDC00">BDC00</option>
                <option value="LF00">LF00</option>
                <option value="HATOII">HATOII</option>
                <option value="LAC00">LAC00</option>
                <option value="LACO00">LACO00</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Estación Base:</label>
              <select
                name="estacion_base"
                value={formData.estacion_base}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              >
                <option value="">Seleccione una estación</option>
                <option value="N1">N1</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="X">X</option>
                <option value="R1">R1</option>
                <option value="R2">R2</option>
                <option value="R3">R3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Tecnología:</label>
              <select
                name="tecnologia"
                value={formData.tecnologia}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              >
                <option value="">Seleccione una tecnología</option>
                <option value="PtMP">PtMP</option>
                <option value="UDP">UDP</option>
                <option value="PtP">PtP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Estado:</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              >
                <option value="">Seleccione un estado</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="pendiente">Pendiente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Fecha de Inicio:</label>
              <input
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Fecha de Finalización:</label>
              <input
                type="date"
                name="fecha_finalizacion"
                value={formData.fecha_finalizacion}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarCliente;
