import axios from "axios";
import { ENV } from "../utils/constants";

// Obtener todas las trivias
const getTrivias = async () => {
  try {
    const response = await axios.get("https://trivias-api.vercel.app/api/trivias");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las trivias:", error);
    throw error;
  }
};

const getTriviaById = async (id) => {
    try {
      const response = await axios.get(`https://trivias-api.vercel.app/api/trivias/${id}`); // Usar comillas invertidas para interpolación
      return response.data;
    } catch (error) {
      console.error("Error al obtener la trivia por ID:", error);
      throw error; // Lanza el error para manejarlo en el frontend
    }
  };

  const getTriviasCompletadas = async (idUsuario) => {
    try {
      const response = await axios.get(
        `https://trivias-api.vercel.app/api/resultados/usuario/${idUsuario}`
      );
      return response.data; // Devuelve un array con los IDs de las trivias completadas
    } catch (error) {
      console.error("Error al obtener trivias completadas:", error);
      throw error;
    }
  };

  

export default {
  getTrivias,
  getTriviaById,
  getTriviasCompletadas
};
