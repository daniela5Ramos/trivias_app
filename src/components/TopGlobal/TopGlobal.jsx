import React, { useState, useEffect } from "react";
import { Table, Card, Typography, Alert } from "antd";
import axios from "axios";
import "../../components/TopGlobal/TopGlobal.css"; // Asegúrate de que el archivo CSS está bien configurado

const { Title } = Typography;

const TopGlobal = () => {
  const [topUsuarios, setTopUsuarios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopPromedios = async () => {
      try {
        const response = await axios.get("https://trivias-api.vercel.app/api/resultados");
        const data = response.data;

        // Agrupar por usuario y sumar puntajes
        const usuariosMap = data.reduce((acc, resultado) => {
          const userId = resultado.idUsuario._id;
          const username = resultado.idUsuario.username;

          if (!acc[userId]) {
            acc[userId] = { username, totalPuntaje: 0 };
          }

          acc[userId].totalPuntaje += resultado.puntaje;
          return acc;
        }, {});

        // Convertir el objeto en un array y ordenarlo
        const usuariosOrdenados = Object.values(usuariosMap).sort(
          (a, b) => b.totalPuntaje - a.totalPuntaje
        );

        setTopUsuarios(usuariosOrdenados);
      } catch (err) {
        setError("Error al cargar el top global");
        console.error(err);
      }
    };

    fetchTopPromedios();
  }, []);

  const columns = [
    {
      title: "Posición",
      dataIndex: "position",
      key: "position",
      render: (_, __, index) => <b>{index + 1}</b>,
      align: "center",
    },
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
      render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
    },
    {
      title: "Puntaje Total",
      dataIndex: "totalPuntaje",
      key: "totalPuntaje",
      render: (puntaje) => <span style={{ color: "#6a0dad" }}>{puntaje}</span>,
      align: "center",
    },
  ];

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ maxWidth: "600px", margin: "20px auto" }}
      />
    );
  }

  return (
    <div
      className="top-global-page"
      style={{
        paddingTop: "110px", // Ajusta este valor para bajar todo el contenido
        backgroundColor: "#eadcf5",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          paddingTop: "40px", // Espaciado interno adicional
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        <Title
       
          style={{ textAlign: "center", color: "#6a0dad", marginBottom: "10px", marginTop:"1px"}}
          className="titulo"
        >
          🏆 Top Global de Usuarios 🏆
        </Title>
        <Table
          columns={columns}
          dataSource={topUsuarios.map((user, index) => ({
            key: index,
            ...user,
          }))}
          pagination={false}
          rowClassName={(record, index) => (index === 0 ? "top-row" : "")}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
          }}
         
        />
      </Card>
    </div>
  );
};

export default TopGlobal;
