import React from "react";
import HistorialPuntajes from "../../components/HistorialPuntajes/HistorialPuntajes"; // Componente del historial de puntajes
import Navbar from "../../components/NavBar/NavBar"; // Componente del Navbar

const Puntajes = () => {
  return (
    <div>
   
      <Navbar />

        <HistorialPuntajes /> {/* Componente del historial de puntajes */}
      </div>
    
  );
};

export default Puntajes;
