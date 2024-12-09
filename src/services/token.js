import { ENV } from "../utils/constants";

// token.js
const setToken = (token) => {
    localStorage.setItem("authToken", token); // Guarda el token en localStorage
  };
  
  const getToken = () => {
    return localStorage.getItem("authToken"); // Recupera el token desde localStorage
  };
  
  const removeToken = () => {
    localStorage.removeItem("authToken"); // Elimina el token de localStorage
  };
  
  export const storageController = {
    setToken,
    getToken,
    removeToken,
  };
  