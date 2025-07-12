import { Routes, Route, useLocation } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import Footer from './components/Footer';
import { Toaster } from 'sonner';

import Inicio from '@/pages/Inicio';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import Admin from './pages/Admin';
import Dashboard from './components/login/Dashboard';
import { SocialesProvider } from './context/Sociales';
import { ServicioProvider } from './context/Servicio';

function App() {
  const location = useLocation();

  // Detecta si la ruta actual está dentro de /admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navegacion />}

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={
          <ServicioProvider>
            <Servicios />
          </ServicioProvider>
        } />
        <Route path="/contacto" element={
          <SocialesProvider>
            <Contacto />
          </SocialesProvider>
        } />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={
          <Dashboard />
        } />
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>

      {!isAdminRoute &&
        <SocialesProvider>
          <Footer />
        </SocialesProvider>

      }

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'text-white',
          style: {
            borderRadius: '0.5rem',
            padding: '0.5rem',
            border: '2px solid',
          },
        }}
        richColors
        gap={3}
        expand={true}
        duration={5000}
        mobileOffset={10}
        swipeDirections={['left', 'right']}
        theme="light"
        visibleToasts={3}
      />
    </>
  );
}

export default App;
