import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { LogoutOutlined, HomeOutlined, TrophyOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { logout } from "../../services/logout"; // Servicio de logout
import "../NavBar/NavBar.css"; // Archivo CSS para los estilos
import logo from '../../assets/logo.png';


const Navbar = () => {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Limpia la sesión
    navigate("/"); // Redirige al Home
  };

  // Funciones para manejar la navegación
  const handleHome = () => navigate("/");
  const handleTrivias = () => navigate("/trivias");
  const handleTopGlobal = () => navigate("/topglobal");
  const handlePuntaje = () => navigate("/puntajes");


  return (
    <header className="header-content">
                  <img src={logo} alt="Logo" className="logo" />

      <div className="logo">Trivia App</div>
      <Menu mode="horizontal" className="menu-items">

        {/* Opción Home */}
        <Menu.Item key="home" icon={<HomeOutlined />} onClick={handleHome} className="m">
          Home
        </Menu.Item>


        {/* Opción Trivias */}
        <Menu.Item key="trivias" icon={<QuestionCircleOutlined />} onClick={handleTrivias} className="m">
          Trivias
        </Menu.Item>


        {/* Opción Top Global */}
        <Menu.Item key="topglobal" icon={<TrophyOutlined />} onClick={handleTopGlobal} className="m">
          Top Global
        </Menu.Item>

          {/* Opción Top Global */}
          <Menu.Item key="puntajes" icon={<TrophyOutlined />} onClick={handlePuntaje} className="m">
          Puntajes
        </Menu.Item>


        {/* Opción Cerrar Sesión */}
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout} className="m">
          Cerrar Sesión
        </Menu.Item>


      </Menu>
    </header>
  );
};

export default Navbar;
