import React from "react";
import Nav from "../../components/Nav/Nav.jsx"; // Navegación para usuarios no autenticados
import NavBar from "../../components/NavBar/NavBar.jsx"; // Navegación para usuarios autenticados
import "../Home/home.css";
import trofeo from "../../assets/trofeo.png";
import { storageController } from "../../services/token"; // Control del token
import { useNavigate } from "react-router-dom"; // Hook para navegación
import CustomButton from "../../components/CustomButton/CustomButton"; // Importa el nuevo botón
import { onMessage ,getToken } from 'firebase/messaging';
import { messaging } from '../../firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const getTokenNotification = async () => { 
    const token = await getToken(messaging, {
      vapikey: 'BC6UJyFE6-KiHrdKsIynaduqIDdtFTogLIK-s_RUcODwlAhTZDcgNoOqFjOnwMycCmVVlHxysph7cbw_hyNe_uU'
    }).catch((err) => console.log('No se pudo obtener el token', err));
  
    if (token) {
      console.log('Token: ', token);
    } else {
      console.log('No hay token disponible');
    }
  };
  
  
  const notificarme =() => {
    if(!window.Notification){
      console.log('Este navegador no soporta las notificaciones');
      return;
    }
    if(Notification.permission === 'granted'){
      getTokenNotification(); //obtener ey mostrar el token en la consola
  
    }else if (Notification.permission !== 'denied' || Notification.permission === 'default'){
      Notification.requestPermission((permission) => {
        console.log(permission);
        if(permission === 'granted') {
          getTokenNotification(); //obtener y mostrar el token en la consola 
        }
      });
    }
  };
  
  notificarme();

  getTokenNotification()
  onMessage(messaging, message => {
    console.log('onMessage: ', message)
    toast(message.notification.title)
  })

  const token = storageController.getToken(); // Verifica si hay un token en localStorage
  const navigate = useNavigate(); // Hook para redirigir a otras páginas

  const handleGoToTrivias = () => {
    navigate("/trivias"); // Redirige a la página de trivias
  };

  return (
    <>
      {token ? <NavBar /> : <Nav />} {/* Cambia la navegación dependiendo del token */}
      <div className="home-container">
        <ToastContainer/>
        <div className="text-content">
        <h1 className="title-text">¡Ponte a prueba y descubre cuánto puedes aprender mientras te diviertes!</h1>
        <p className="description-text">
            Pon a prueba tus conocimientos en cultura, salud, deportes, política, finanzas,
            historia, empleo y mucho más. Descubre nuevas trivias cada semana y mantén tu
            mente activa mientras compites con familiares y amigos. ¡Demuestra quién es el
            verdadero campeón y no te pierdas los desafíos que tenemos preparados para ti!.
          </p>
          <CustomButton onClick={handleGoToTrivias} text="Ir a las Trivias" />
         
        </div>
        <div className="image-content">
          <img src={trofeo} alt="Trofeo" />
        </div>
      </div>
    </>
  );
};

export default Home;
