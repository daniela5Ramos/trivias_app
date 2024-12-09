
import axios from "axios";

// Servicio para crear un nuevo resultado
const createResultado = async (resultado) => {
  try {
    const response = await axios.post("https://trivias-api.vercel.app/api/resultados", resultado);
    return response.data;
  } catch (error) {
    console.error("Error al crear el resultado:", error.response?.data || error.message);
    throw error;
  }
};

// Exportar el servicio como default
export default {
  createResultado,
};