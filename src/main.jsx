import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Dashboard from './components/Dashboard.jsx'
import Frutas from './components/Frutas.jsx'
import CrearCliente from './components/CrearCliente.jsx'
import ObtenerUsuario from './components/ObtenerUsuario.jsx'
import Perfil from './components/Perfil.jsx'
import Layouts from './Layouts/Layouts.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "crearcliente",
        element: <CrearCliente />,
      },
      {
        path: "obtenerusuario",
        element: <ObtenerUsuario />,
      },
      {
        path: "perfil",
        element: <Perfil />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
