import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Home, Users } from 'lucide-react';
import { FaUser } from 'react-icons/fa';

const Layouts = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dots, setDots] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/login');
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.removeItem('auth_token');
            navigate('/login');
            setLoading(false);
        }, 3000); // Añadido un retraso para simular la carga
    };

    const handleNavigation = (path) => {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
            setLoading(false);
        }, 3000); // Añadido un retraso para simular la carga
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gradient-to-r from-gray-800 via-blue-900 to-gray-800 p-4 fixe">
                <ul className="flex justify-between items-center">
                    <li>
                        <button onClick={() => handleNavigation('/')} className="text-white hover:text-gray-300 flex items-center">
                            <Home className="mr-2" /> Home
                        </button>
                    </li>
                    <div className="flex space-x-4 items-center">
                        <li>
                            <button onClick={() => handleNavigation('/obtenerusuario')} className="text-white hover:text-gray-300 flex items-center">
                                <Users className="mr-2" /> Clientes
                            </button>
                        </li>
                        <li className="relative" ref={dropdownRef}>
                            <button onClick={toggleDropdown} className="text-white hover:text-gray-300 flex items-center">
                                <FaUser className="mr-2" /> 
                            </button>
                            <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ${showDropdown ? 'block' : 'hidden'}`}>
                                <button onClick={() => handleNavigation('/perfil')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Ver Perfil
                                </button>
                                <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Cerrar Sesión
                                </button>
                            </div>
                        </li>
                    </div>
                </ul>
            </nav>
            <div className="flex-grow bg-gray-900 text-gray-200">
                {loading ? (
                    <div className="flex justify-center items-center min-h-full mt-60">
                        <div className="text-6xl font-bold">{dots}</div> {/* Cambiado el tamaño de los puntitos a 6xl */}
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
};

export default Layouts;
