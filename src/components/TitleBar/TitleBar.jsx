import React from 'react';
import '../../App.css' // Asegúrate de que este archivo tenga el CSS de la barra de título

const TitleBar = () => {
  return (
    <div id="title-bar">
      <span>Mi Aplicación</span>
      <div id="window-controls">
        {/* Aquí puedes agregar botones si los necesitas */}
        <button onClick={() => console.log('Minimizar')}>Minimizar</button>
        <button onClick={() => console.log('Cerrar')}>Cerrar</button>
      </div>
    </div>
  );
};

export default TitleBar;
