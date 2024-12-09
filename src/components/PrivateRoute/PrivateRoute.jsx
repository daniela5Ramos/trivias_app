import React from "react";
import { Navigate } from "react-router-dom";
import { storageController } from "../../services/token"; // Importa donde manejas el token

const PrivateRoute = ({ children }) => {
  const token = storageController.getToken(); // Verifica si el token está en localStorage

  return token ? children : <Navigate to="/login" />; // Si no hay token, redirige al login
};

export default PrivateRoute;
