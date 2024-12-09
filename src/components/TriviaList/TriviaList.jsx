import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, message } from "antd";
import triviaService from "../../services/trivias";
import auth from "../../services/auth";

import salud from "../../assets/salud.png";
import quimica from "../../assets/quimica.png";
import historia from "../../assets/historia.png";
import cine from "../../assets/cine.png";
import arte from "../../assets/arte.png";
import politica from "../../assets/politica.png";

const { Meta } = Card;

const TriviaList = () => {
  const [trivias, setTrivias] = useState([]); // Todas las trivias
  const [triviasCompletadas, setTriviasCompletadas] = useState([]); // Trivias completadas
  const [error, setError] = useState(""); // Errores
  const navigate = useNavigate(); // Hook para redirigir

  // Relación entre títulos de trivias y sus imágenes
  const triviaImages = {
    Salud: salud,
    Química: quimica,
    Historia: historia,
    Cine: cine,
    Arte: arte,
    Política: politica,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUsuario = auth.getUserIdFromToken();
        if (!idUsuario) {
          message.error("Debes iniciar sesión para continuar.");
          navigate("/login");
          return;
        }

        // Obtener todas las trivias
        const allTrivias = await triviaService.getTrivias();

        // Obtener trivias completadas por el usuario
        const completadas = await triviaService.getTriviasCompletadas(idUsuario);
        setTriviasCompletadas(completadas);

        // Guardar todas las trivias
        setTrivias(allTrivias);
      } catch (err) {
        setError("Error al cargar las trivias.");
        console.error("Error al cargar trivias:", err);
      }
    };

    fetchData();
  }, [navigate]);

  // Redirigir a la trivia seleccionada
  const handleViewQuestions = (triviaId) => {
    navigate(`/preguntas/${triviaId}`);
  };

  // Verificar si todas las trivias están completadas
  const allCompleted = trivias.length > 0 && trivias.every((trivia) => triviasCompletadas.includes(trivia._id));

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {allCompleted ? (
        <div>
          <h2 style={{ color: "#6a0dad" }}>¡Has completado todas las trivias!</h2>
          <p style={{ color: "gray" }}>Gracias por participar. No hay más trivias disponibles en este momento.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {trivias.map((trivia) => (
            <Card
              key={trivia._id}
              hoverable={!triviasCompletadas.includes(trivia._id)}
              style={{ width: 300, opacity: triviasCompletadas.includes(trivia._id) ? 0.6 : 1 }}
              cover={
                <img
                  alt={trivia.titulo}
                  src={triviaImages[trivia.titulo] || salud}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
            >
              <Meta title={trivia.titulo} description={trivia.descripcion} />
              <Button
                type="primary"
                style={{ marginTop: "15px", width: "100%", borderRadius: "10px" }}
                onClick={() => handleViewQuestions(trivia._id)}
                disabled={triviasCompletadas.includes(trivia._id)} // Deshabilitar botón si ya se completó
              >
                {triviasCompletadas.includes(trivia._id) ? "Completada" : "Ver Preguntas"}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TriviaList;
