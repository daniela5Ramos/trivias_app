import React from 'react';

import LayoutComponent from "../../components/Layout";
import ImageLogin from "../../components/ImageLogin";
import FormRegister from "../../components/FormRegister";


const Register = () => {

  const leftColSize = { xs: 24, sm: 24, md: 16, lg: 12 };
  const rightColSize = { xs: 0, sm: 0, md: 8, lg: 12 };

  return (
    <LayoutComponent
      leftColSize={leftColSize}
      rightColSize={rightColSize}
      leftContent={<ImageLogin />}
      rightContent={<FormRegister />}
    />
  );
};
export default Register;




