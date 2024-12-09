import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './App.css';
import TitleBar from '../src/components/TitleBar/TitleBar'

function App() {

  
  return (
    
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF69B4',
        },
      }}
    >
         <TitleBar />


      {/* Rutas principales */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
