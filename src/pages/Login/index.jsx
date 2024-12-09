import React from 'react';
import LayoutComponent from "../../components/Layout"; // Ruta corregida para LayoutComponent
import ImageLogin from '../../components/ImageLogin'; // Corrige la ruta si es necesario
import FormLogin from '../../components/FormLogin';   // Corrige la ruta si es necesario

const Login = () => {
    const leftColSize = { xs: 0, sm: 0, md: 8, lg: 6 };
    const rightColSize = { xs: 24, sm: 24, md: 16, lg: 18 };

    return (
        <LayoutComponent
            leftColSize={leftColSize}
            rightColSize={rightColSize}
            leftContent={<ImageLogin />}
            rightContent={<FormLogin />}
        />
    );
};

export default Login;
