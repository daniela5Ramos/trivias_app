import React from "react";
import TriviaList from "../../components/TriviaList/TriviaList.jsx";
import Navbar from "../../components/NavBar/NavBar"; // Importar el Navbar
import "./Trivias.css"; // Importar el archivo CSS para estilos específicos

const Trivias = () => {
  return (
    <div>
      <Navbar />
    <div className="trivias-page">
     
      <div className="trivias-content">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Trivias</h1>
        <TriviaList /> {/* Componente que maneja la lista y la búsqueda */}
      </div>
    </div>
    </div>
  );
};

export default Trivias;
