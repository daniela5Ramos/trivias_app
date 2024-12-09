import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import historialService from "../../services/puntajes";
import { Card, List, Spin, Alert, Button } from "antd";
import { getUserIdFromToken } from "../../services/auth";
import Navbar from "../../components/NavBar/NavBar"; // Componente del Navbar

const HistorialPuntajes = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const idUsuario = getUserIdFromToken();
        if (!idUsuario) {
          console.error("ID del usuario no válido:", idUsuario);
          setError("Usuario no identificado. Redirigiendo a inicio.");
          setLoading(false);
          navigate("/login");
          return;
        }

        console.log("ID del usuario obtenido:", idUsuario);

        const data = await historialService.getHistorialPuntajes(idUsuario);
        setHistorial(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar el historial de puntajes:", err);
        setError("Error al cargar el historial de puntajes.");
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [navigate]);

  if (loading) return <Spin tip="Cargando historial..." />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div
      style={{
        backgroundColor: "#f3e5f5", // Fondo lila claro
        minHeight: "100vh", // Asegura que el fondo cubra toda la pantalla
      }}
    >
      <Navbar />
      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "auto",
          marginTop: "50px", // Para que el contenido comience después del Navbar
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#6a0dad" }}>
          Historial de Puntajes
        </h2>
        <Card style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)" }}>
        <List
  itemLayout="horizontal"
  dataSource={historial}
  renderItem={(item) => (
    <List.Item>
      <List.Item.Meta
        title={`Trivia: ${item.titulo || "Sin título"}`}
        description={`Puntajes: ${item.puntajes && item.puntajes.length > 0 ? item.puntajes.join(", ") : "No disponible"}`}
      />
    </List.Item>
  )}
/>



          <Button
            onClick={() => navigate("/home")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#6a0dad",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Volver al Inicio
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default HistorialPuntajes;
