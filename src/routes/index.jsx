import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TriviaList from "../pages/Trivias";
import PreguntaList from "../pages/Preguntas";
import TopGlobalPage from "../pages/TopGlobal"; // Importar la nueva página
import PrivateRoute from "../components/PrivateRoute/PrivateRoute"; // Importar el componente de rutas privadas
import HistorialPuntajes from "../components/Puntajes/Puntajes"

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    // Ruta protegida para preguntas
    {
        path: "/trivias",
        element: (
          <PrivateRoute>
            <TriviaList />
          </PrivateRoute>
        ),
      },

    // Ruta protegida para preguntas
    {
      path: "/preguntas/:triviaId",
      element: (
        <PrivateRoute>
          <PreguntaList />
        </PrivateRoute>
      ),
    },

    // Ruta protegida para el top global
    {
      path: "/topglobal",
      element: (
        <PrivateRoute>
          <TopGlobalPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/puntajes",
      element: (
        <PrivateRoute>
          <HistorialPuntajes />
        </PrivateRoute>
      ),
    },

  ]);

  return routes;
};

export default AppRoutes;
