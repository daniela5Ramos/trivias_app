import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import preguntasService from "../../services/preguntas";
import PreguntasList from "../../components/PreguntasList/PreguntasList";
import Navbar from "../../components/NavBar/NavBar"; // Importar el Navbar
import { getUserIdFromToken } from "../../services/auth"; // Obtener el ID del usuario
import "../Preguntas/Preguntas.css"; // Importar los estilos CSS
import { Spin, Alert } from "antd";

const Preguntas = () => {
  const { triviaId } = useParams();
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const idUsuario = getUserIdFromToken();
        if (!idUsuario) {
          setError("Usuario no identificado.");
          navigate("/login", { replace: true });
          return;
        }

        const data = await preguntasService.getAllPreguntas();
        const preguntasFiltradas = data.filter((pregunta) => pregunta.idTrivia === triviaId);
        setPreguntas(preguntasFiltradas);
        setLoading(false);
      } catch (err) {
        setError("Hubo un error al cargar las preguntas.");
        console.error("Error al obtener preguntas:", err);
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, [triviaId, navigate]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin tip="Cargando preguntas..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div
        style={{ backgroundColor: "#eadcf5", minHeight: "100vh", padding: "20px" }}
        className="preguntas-page"
      >
        <div className="preguntas-content">
          <PreguntasList preguntas={preguntas} idTrivia={triviaId} />
        </div>
      </div>
    </div>
  );
};

export default Preguntas;
