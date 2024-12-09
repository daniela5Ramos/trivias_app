import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./FormLogin.css";
import auth from "../../services/auth"; // Importar el servicio
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await auth.loginF(values.email, values.password);
      console.log("Inicio de sesión exitoso, token almacenado:", response.data.token);

      localStorage.setItem("authToken", response.data.token); // Guarda el token
      message.success("Inicio de sesión exitoso"); // Muestra un mensaje de éxito

      navigate("/home"); // Redirige al usuario a la página principal
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.response?.data || error.message);
      setLoginError(true);
      message.error("Error al iniciar sesión. Verifica tus credenciales."); // Muestra un mensaje de error
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoginError(true);
  };

  return (
    <Card title="LOGIN" bordered={false} className="responsive-card">
      <Form
        name="login_form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor ingresa un correo electrónico",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Correo electrónico" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu contraseña",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
        </Form.Item>
        <Form.Item>
          {loginError && <p style={{ color: "red" }}>Credenciales inválidas</p>}
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
            SIGN IN
          </Button>
        </Form.Item>
        ¿Aún no tienes una cuenta?{" "}
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
          style={{ color: "#1890ff", cursor: "pointer" }}
        >
          REGISTER
        </a>
      </Form>
    </Card>
  );
};

export default FormLogin;
