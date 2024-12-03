// src/utils/auth.js

export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('auth_token', token); // Guardamos el token en localStorage
    } else {
      localStorage.removeItem('auth_token'); // Limpiamos el token al hacer logout
    }
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('auth_token'); // Recuperamos el token desde localStorage
  };
  
  export const isAuthenticated = () => {
    return !!getAuthToken(); // Devuelve true si el token existe
  };
  