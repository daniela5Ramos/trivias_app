import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Radio, Button, message } from "antd";
import auth from "../../services/auth";
import resultadosService from "../../services/resultados";
import preguntasService from "../../services/preguntas";

const PreguntasList = () => {
  const { triviaId } = useParams();
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [messageApi, contextHolder] = message.useMessage(); // Inicializamos useMessage

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        if (!navigator.onLine) {
          messageApi.warning("Estás sin conexión. Asegúrate de haber cargado las preguntas previamente.", 3);
          return;
        }

        const allPreguntas = await preguntasService.getAllPreguntas();
        const preguntasFiltradas = allPreguntas.filter(
          (pregunta) => String(pregunta.idTrivia) === String(triviaId)
        );
        setPreguntas(preguntasFiltradas);
      } catch (error) {
        console.error("Error al cargar las preguntas:", error);
        messageApi.error("Error al cargar las preguntas. Por favor, intenta más tarde.", 3);
      }
    };

    fetchPreguntas();
  }, [triviaId, messageApi]);

  const handleChange = (preguntaId, opcionId) => {
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: opcionId,
    }));
  };

  const calcularPuntaje = () => {
    let puntaje = 0;
  
    preguntas.forEach((pregunta) => {
      const respuestaSeleccionada = respuestas[pregunta._id];
      const opcionCorrecta = pregunta.opciones.find(
        (opcion) => opcion._id === respuestaSeleccionada && opcion.correcta
      );
  
      if (opcionCorrecta) {
        puntaje += 10; // Incrementa 10 puntos por cada respuesta correcta
      }
    });
  
    console.log("Puntaje calculado:", puntaje); // Log para verificar el puntaje
    return puntaje;
  };
  

  const handleSubmit = async () => {
    const idUsuario = auth.getUserIdFromToken();
    const puntaje = calcularPuntaje();
  
    const resultado = {
      idUsuario,
      idTrivia: triviaId,
      puntaje, // Envío del puntaje calculado
    };
  
    console.log("Enviando resultado:", resultado);
    
    try {
      await resultadosService.createResultado(resultado);
      messageApi.success("¡Resultados enviados correctamente!", 3);
      navigate("/puntajes");
    } catch (error) {
      console.error("Error al enviar resultados:", error);
      messageApi.error("Error al enviar los resultados. Por favor, intenta más tarde.", 3);
    }
  };
  

  const handleNext = () => {
    if (currentIndex < preguntas.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (preguntas.length === 0) {
    return (
      <>
        {contextHolder}
        <p style={{ textAlign: "center", color: "red" }}>No hay preguntas disponibles para esta trivia.</p>
      </>
    );
  }

  const preguntaActual = preguntas[currentIndex];

  return (
    <>
      {contextHolder} {/* Esto asegura que el contexto del mensaje esté disponible */}
      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "auto",
          backgroundColor: "#eadcf5",
          borderRadius: "10px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#6a0dad",
          }}
        >
          Preguntas de la Trivia
        </h2>
        <Card
          key={preguntaActual._id}
          title={preguntaActual.texto}
          bordered={true}
          style={{
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
          }}
        >
          <Radio.Group
            onChange={(e) => handleChange(preguntaActual._id, e.target.value)}
            value={respuestas[preguntaActual._id]}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {preguntaActual.opciones.map((opcion) => (
              <Radio.Button
                key={opcion._id}
                value={opcion._id}
                style={{
                  backgroundColor: respuestas[preguntaActual._id] === opcion._id ? "#9b59b6" : "#f5f5f5",
                  borderColor: "#6a0dad",
                  color: respuestas[preguntaActual._id] === opcion._id ? "white" : "#6a0dad",
                  fontWeight: "bold",
                }}
              >
                {opcion.texto}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Card>

        {currentIndex < preguntas.length - 1 ? (
          <Button
            type="primary"
            style={{
              backgroundColor: "#6a0dad",
              borderColor: "#6a0dad",
              borderRadius: "20px",
              color: "white",
              width: "100%",
              fontWeight: "bold",
            }}
            onClick={handleNext}
          >
            Siguiente
          </Button>
        ) : (
          <Button
            type="primary"
            style={{
              backgroundColor: "#6a0dad",
              borderColor: "#6a0dad",
              borderRadius: "20px",
              color: "white",
              width: "100%",
              fontWeight: "bold",
            }}
            onClick={handleSubmit}
          >
            Enviar Respuestas
          </Button>
        )}
      </div>
    </>
  );
};

export default PreguntasList;
