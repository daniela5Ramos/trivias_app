import { storageController } from "./token"; // Manejo de token en localStorage

export const logout = () => {
  // Eliminar el token del almacenamiento local
  storageController.removeToken();

  // Si tienes otros datos relacionados con el usuario (e.g., roles, preferencias)
  // eliminarlos aquí
  localStorage.removeItem("userPreferences"); // Ejemplo
  sessionStorage.clear(); // Limpia la sesión actual
};
