import React from "react";
import { Button } from "antd";

const CustomButton = ({ onClick, text }) => {
  return (
    <Button
      type="primary"
      style={{
        marginTop: "20px",
        padding: "8px 20px", // Reduce el padding vertical
        fontSize: "16px",
        borderRadius: "25px", // Bordes redondeados
        backgroundColor: "#8A2BE2", // Lila fuerte
        borderColor: "#8A2BE2", // Borde del mismo color
        color: "#fff", // Texto en blanco
        lineHeight: "1", // Ajusta la altura de la línea
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Agrega una ligera sombra
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
