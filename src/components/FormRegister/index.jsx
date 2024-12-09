import React, {useState} from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import  "./FormRegister.css";
import axios from 'axios';

import { useNavigate } from "react-router-dom";


const FormRegister = () => {

    const navigate= useNavigate();

    const [registerError, setRegisterError] = useState(false);
    const [loading, setLoading] = useState(false);


    const onFinish = async (values) => {
        setLoading(true);
        try{
            const response = await axios.post('https://trivias-api.vercel.app/api/auth/signup', {
                username:values.username,
                email: values.email,
                password:values.password,
                roles: ['user']
            });
       
         console.log('Registro exitoso:', response.data);
         navigate('/login');
           }
           catch(error){
            console.log('Error en el registro:', error.response.data);
            setRegisterError(true);
           }
           finally{
            setLoading(false);
           }
      
    };

    const onFinishFiled = (errorInfo) => {
        console.log('Failed: ', errorInfo);
        setRegisterError(true);

    };

    const validatePassword = ({getFieldValue}) => 
        ({
            validator(_, value){
                if (!value||getFieldValue('password')===value) {
                    return Promise.resolve();
                    
                }

                return Promise.reject(new Error('Las contraseñas no coinciden'));
            },
        });

    return (
        <>
        <Card 
            title="Registrate"
            bordered={false}
            className='responsive-card'
        >

        <Form
            name="normal_register"
            className="register-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFiled}
        >
            <Form.Item
            name="username"
                rules={[
                    {
                        required: true,
                        message: 'Ingresa un usuario'
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Nombre"/>

            </Form.Item>

            <Form.Item
            name="email"
                rules={[
                    {
                        required: true,
                        message: 'Ingresa tu email'
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>

            </Form.Item>

            <Form.Item
            name="password"
                rules={[
                    {
                        required: true,
                        message: 'Ingresa una contraseña'
                    }
                ]}
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} 
                type="password"
                placeholder='Password'/>

            </Form.Item>

            <Form.Item
            name="password-repet"
                rules={[
                    {
                        required: true,
                        message: 'Repita su contraseña'
                    },
                    ({getFieldValue}) => validatePassword({getFieldValue}),

                ]}
            >
                <Input.Password 
                prefix={<LockOutlined className="site-form-item-icon"/>} 
                type="password"
                placeholder='Repetir contraseña'/>

            </Form.Item>

            <Form.Item>
                {registerError && <p style={{color:'red'}}>Falló el registro</p>}
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                Registrarme
              </Button>
            </Form.Item>

            Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a>
           

        </Form>
        </Card>
        </>
    );
}

export default FormRegister;