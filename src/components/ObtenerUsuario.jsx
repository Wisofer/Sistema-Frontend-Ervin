import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaSearch, FaFileExcel, FaUserPlus, FaFileImport } from 'react-icons/fa';
import CrearCliente from './CrearCliente.jsx';
import EditarCliente from './EditarCliente.jsx';
import * as XLSX from 'xlsx';

const ObtenerCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/clientes');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleAgregarUsuario = () => {
    setMostrarModal(true);
    setModoEdicion(false);
    setClienteSeleccionado(null); // Cerrar cualquier modal abierto
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setClienteSeleccionado(null);
  };

  const handleExportarExcel = () => {
    const clientesFiltrados = clientes.map(({ id, created_at, updated_at, ...resto }) => resto);
    const worksheet = XLSX.utils.json_to_sheet(clientesFiltrados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
    XLSX.writeFile(workbook, 'clientes.xlsx');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleVerCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/clientes/${id}`);
      const data = await response.json();
      setClienteSeleccionado(data);
      setMostrarModal(true);
      setModoEdicion(false);
    } catch (error) {
      console.error('Error fetching cliente:', error);
    }
  };

  const handleEditarCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/clientes/${id}`);
      const data = await response.json();
      setClienteSeleccionado(data);
      setMostrarModal(true);
      setModoEdicion(true);
    } catch (error) {
      console.error('Error fetching cliente:', error);
    }
  };

  const handleEliminarCliente = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/clientes/${id}`, {
        method: 'DELETE',
      });
      setClientes(clientes.filter(cliente => cliente.id !== id));
      setMostrarConfirmacion(false);
    } catch (error) {
      console.error('Error eliminando cliente:', error);
    }
  };

  const confirmEliminarCliente = (id) => {
    setClienteAEliminar(id);
    setMostrarConfirmacion(true);
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (clientes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className=" flex flex-col min-h-screen text-gray-200 bg-gray-800 shadow-lg  bg-clip-border">
      <div className=" mx-4 mt-4 overflow-hidden text-gray-200 bg-gray-800  bg-clip-border">
        <div className="flex items-center justify-between gap-8 mb-8">
          <div>
            <h5 className="block font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-white">
              Usuarios
            </h5>
            <p className="block mt-1 font-sans text-lg antialiased font-normal leading-relaxed text-gray-300">
              Datos generales de clientes
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
            <button onClick={handleAgregarUsuario} className="flex select-none items-center gap-3 rounded-lg bg-blue-600 py-2 px-4 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" title="Agregar Usuario">
              <FaUserPlus className="w-5 h-5" />
            </button>
            <button className="flex select-none items-center gap-3 rounded-lg bg-green-600 py-2 px-4 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" title="Importar Archivo">
              <FaFileImport className="w-5 h-5" />
            </button>
            <button onClick={handleExportarExcel} className="flex select-none items-center gap-3 rounded-lg bg-green-500 py-2 px-4 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" title="Exportar a Excel">
              <FaFileExcel className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <input type="text" id="search" placeholder="Buscar..." value={searchTerm} onChange={handleSearch} className="border border-gray-300 rounded-l px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <button onClick={() => {}} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center justify-center">
              <FaSearch className="w-5 h-5" />
            </button>
            <button onClick={() => setSearchTerm('')} className="bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Resetear
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 px-0 overflow-scroll">
        <table className="w-full mt-4 text-left table-auto min-w-max" id="usuariosTable">
          <thead>
            <tr>
              <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-gray-700 hover:bg-gray-600">
                <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-gray-200 opacity-70">
                  Datos Personales
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-gray-700 hover:bg-gray-600">
                <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-gray-200 opacity-70">
                  Servicio
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-gray-700 hover:bg-gray-600">
                <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-gray-200 opacity-70">
                  Tecnología
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-gray-700 hover:bg-gray-600">
                <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-gray-200 opacity-70">
                  Estado
                </p>
              </th>
              <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-gray-700 hover:bg-gray-600">
                <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-gray-200 opacity-70">
                  Operaciones
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-600">
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-200">
                        <b>{cliente.nombres} {cliente.apellidos}</b><br />
                        {cliente.cedula}<br />
                        {cliente.codigo_pais} {cliente.telefono}<br />
                        {cliente.codigo}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-200">
                      {cliente.servicio} ({cliente.plan})
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-200">
                      {cliente.tecnologia}
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-200">
                    {cliente.estado}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <button onClick={() => handleVerCliente(cliente.id)} className="text-blue-400 hover:text-blue-600" title="Ver más">
                    <FaEye className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleEditarCliente(cliente.id)} className="text-yellow-400 hover:text-yellow-600 mx-2" title="Editar">
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button onClick={() => confirmEliminarCliente(cliente.id)} className="text-red-400 hover:text-red-600" title="Eliminar">
                    <FaTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-200">
          Page 1 of 10
        </p>
        <div className="flex gap-2">
          <button className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-200 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            Previous
          </button>
          <button className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-200 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            Next
          </button>
        </div>
      </div>
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-20">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-3/4 max-h-full overflow-y-auto mt-8 mb-8"> {/* Ancho del modal aumentado y scroll añadido, margen superior e inferior añadido */}
            <button onClick={handleCerrarModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold">
              X
            </button>
            {clienteSeleccionado ? (
              modoEdicion ? (
                <EditarCliente cliente={clienteSeleccionado} onSave={handleCerrarModal} onClose={handleCerrarModal} />
              ) : (
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg text-white">
                  <h2 className="text-2xl font-extrabold mb-6 text-center">✨ Información del Cliente ✨</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Nombres:</p>
                      <p className="text-lg">{clienteSeleccionado.nombres}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Apellidos:</p>
                      <p className="text-lg">{clienteSeleccionado.apellidos}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Cédula:</p>
                      <p className="text-lg">{clienteSeleccionado.cedula}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Teléfono:</p>
                      <p className="text-lg">{clienteSeleccionado.codigo_pais} {clienteSeleccionado.telefono}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Código:</p>
                      <p className="text-lg">{clienteSeleccionado.codigo}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Servicio:</p>
                      <p className="text-lg">{clienteSeleccionado.servicio} ({clienteSeleccionado.plan})</p>
                    </div>
                    <div>
                      <p className="font-semibold">Tecnología:</p>
                      <p className="text-lg">{clienteSeleccionado.tecnologia}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Estado:</p>
                      <p className="text-lg">{clienteSeleccionado.estado}</p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div>
                <CrearCliente />
              </div>
            )}
            <button onClick={handleCerrarModal} className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
              Cerrar
            </button>
          </div>
        </div>
      )}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto"> {/* Hacer el modal responsive */}
            <h2 className="text-xl font-bold mb-4 text-white">Confirmación</h2>
            <p className="text-gray-200">¿Está seguro de que desea eliminar este usuario?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setMostrarConfirmacion(false)} className="bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 mr-2">
                Cancelar
              </button>
              <button onClick={() => handleEliminarCliente(clienteAEliminar)} className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObtenerCliente;
