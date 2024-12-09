import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"; // Importar Link para navegación
import "./Nav.css";
import logo from '../../assets/logo.png';

const { Header } = Layout;

const Nav = () => {
    return (
        <Header className="header-content">
            <img src={logo} alt="Logo" className="logo" />

            <Menu
                theme="light"
                mode="horizontal"
                className="menu-items"
            >
                <Menu.Item key="1">
                    <Link to="/">INICIO</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/funcionamiento">COMO FUNCIONA</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                    <Link to="/login">INICIAR SESION</Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default Nav;
