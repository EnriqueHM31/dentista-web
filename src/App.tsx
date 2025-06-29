import Navegacion from './components/Navegacion'
import { Routes, Route } from 'react-router-dom'
import Inicio from '@/pages/Inicio'
import { Toaster } from 'sonner'
import Footer from './components/Footer'
import Servicios from './pages/Servicios'
import Contacto from './pages/Contacto'



function App() {

  return (
    <>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/sobre-nosotros" element={<h1>Sobre nosotros</h1>} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>

      <Footer />

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: ' text-white',
          style: {
            borderRadius: '0.5rem',
            padding: '0.5rem',
            border: '2px solid'
          },
        }}
        richColors
        gap={3}
        expand={true}
        duration={5000}
        mobileOffset={10}
        swipeDirections={['left', 'right']}
        theme='light'
        visibleToasts={3}
      />
    </>
  )
}

export default App
