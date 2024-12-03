import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CrearCliente = () => {
    const [formData, setFormData] = useState({
        codigo: '',
        nombres: '',
        apellidos: '',
        cedula: '',
        telefono: '',
        codigo_pais: '',
        servicio: '',
        plan: '',
        sector: '',
        fecha_inicio: '',
        fecha_finalizacion: '',
        estacion_base: '',
        tecnologia: '',
        estado: '',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fechaActual = new Date().toISOString().split('T')[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            fecha_inicio: fechaActual
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Hubo un error al enviar el formulario.');
            }

            const data = await response.json();
            console.log('Cliente agregado:', data);
            setFormData({
                codigo: '',
                nombres: '',
                apellidos: '',
                cedula: '',
                telefono: '',
                codigo_pais: '',
                servicio: '',
                plan: '',
                sector: '',
                fecha_inicio: '',
                fecha_finalizacion: '',
                estacion_base: '',
                tecnologia: '',
                estado: '',
            });
            navigate('/obtenerusuario', { replace: true });
            window.location.reload();
        } catch (err) {
            setError(err.message || 'Error al hacer la solicitud. Inténtalo de nuevo más tarde.');
        }
    };

    const generarCodigo = () => {
        const numeros = Math.floor(1000 + Math.random() * 9000).toString();
        const letras = Math.random().toString(36).substring(2, 6).toUpperCase();
        const codigoGenerado = numeros + letras;
        setFormData({
            ...formData,
            codigo: codigoGenerado
        });
    };

    return (
        <div className="max-w-full mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl"> {/* Ancho del modal aumentado y responsive */}
            <h2 className="text-2xl font-bold mb-4 text-white">Agregar Cliente</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-1 sm:col-span-2 flex items-center">
                        <div className="flex-grow">
                            <label className="block text-sm font-medium text-gray-300">
                                Código:
                            </label>
                            <input
                                type="text"
                                name="codigo"
                                value={formData.codigo}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={generarCodigo}
                            className="ml-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Generar
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Nombres:
                        </label>
                        <input
                            type="text"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Apellidos:
                        </label>
                        <input
                            type="text"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Cédula:
                        </label>
                        <input
                            type="text"
                            name="cedula"
                            value={formData.cedula}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Teléfono:
                        </label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Código País:
                        </label>
                        <select
                            name="codigo_pais"
                            value={formData.codigo_pais}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        >
                            <option value="">Seleccione un código</option>
                            <option value="505">505</option>
                            <option value="506">506</option>
                            <option value="1">1</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Servicio:
                        </label>
                        <select
                            name="servicio"
                            value={formData.servicio}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        >
                            <option value="">Seleccione un servicio</option>
                            <option value="IR">Internet Residencial</option>
                            <option value="RER">Radio Enlace Residencial</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Plan:
                        </label>
                        <select
                            name="plan"
                            value={formData.plan}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
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
                        <label className="block text-sm font-medium text-gray-300">
                            Sector:
                        </label>
                        <select
                            name="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
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
                        <label className="block text-sm font-medium text-gray-300">
                            Estación Base:
                        </label>
                        <select
                            name="estacion_base"
                            value={formData.estacion_base}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
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
                        <label className="block text-sm font-medium text-gray-300">
                            Tecnología:
                        </label>
                        <select
                            name="tecnologia"
                            value={formData.tecnologia}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        >
                            <option value="">Seleccione una tecnología</option>
                            <option value="PtMP">PtMP</option>
                            <option value="UDP">UDP</option>
                            <option value="PtP">PtP</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Estado:
                        </label>
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        >
                            <option value="">Seleccione un estado</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                            <option value="pendiente">Pendiente</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Fecha de Inicio:
                        </label>
                        <input
                            type="date"
                            name="fecha_inicio"
                            value={formData.fecha_inicio}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Fecha de Finalización:
                        </label>
                        <input
                            type="date"
                            name="fecha_finalizacion"
                            value={formData.fecha_finalizacion}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                        />
                    </div>

                </div>

                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Agregar Cliente
                </button>
            </form>
        </div>
    );
};

export default CrearCliente;
