import axios from "axios";
import { ENV } from '../utils/constants'

import { jwtDecode } from "jwt-decode";


const register = async (username, email, password) => {
    return axios.post("https://trivias-api.vercel.app/api/auth/signup", {
        username,
        email,
        password,
        roles: ['user']
    });
};

const loginF = async (email, password) => {
  return await axios.post("https://trivias-api.vercel.app/api/auth/signin", { email, password });
};


 

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No se encontró un token en localStorage.");
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Token decodificado:", decoded);

    // Asegúrate de extraer el campo correcto del token
    if (decoded.id && typeof decoded.id === "string") {
      return decoded.id; // Retorna el ID directamente si es un string
    } else if (decoded.id && decoded.id._id) {
      return decoded.id._id; // Si el ID está anidado, retorna _id
    } else {
      console.error("El token no contiene un campo 'id' válido.");
      return null;
    }
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};
  


  
export default {
    register,
    loginF,
    getUserIdFromToken

}