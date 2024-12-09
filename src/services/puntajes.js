import axios from "axios";

const getHistorialPuntajes = async (idUsuario) => {
  if (!idUsuario || typeof idUsuario !== "string") {
    throw new Error("ID del usuario no válido.");
  }

  try {
    const response = await axios.get(
      `https://trivias-api.vercel.app/api/resultados/historial/usuario/${idUsuario}`
    );
    console.log("Datos recibidos del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener historial de puntajes:", error);
    throw error;
  }
};




export default { getHistorialPuntajes };
