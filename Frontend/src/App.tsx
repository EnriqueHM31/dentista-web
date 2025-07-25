import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import PublicPages from "@/routes/publicPages";
import ServiciosPages from "@/routes/ServiciosPages";

import Inicio from "@/pages/Inicio";
import Servicios from "@/pages/Servicios";
import Contacto from "@/pages/Contacto";
import Citas from "@/pages/Citas";

import Admin from "@/pages/Admin";
import Dashboard from "@/components/login/Dashboard";

function App() {
  return (
    <>
      <Routes>
        {/* Rutas públicas con navegación y footer */}
        <Route element={<PublicPages />}>
          <Route index element={<Inicio />} />

          <Route element={<ServiciosPages />}>
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/contacto" element={<Contacto />} />
          </Route>
        </Route>

        {/* Rutas de admin sin navegación ni footer */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Ruta 404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "text-white",
          style: {
            borderRadius: "0.5rem",
            padding: "0.5rem",
            border: "2px solid",
          },
        }}
        richColors
        gap={3}
        expand={true}
        duration={5000}
        mobileOffset={10}
        swipeDirections={["left", "right"]}
        theme="light"
        visibleToasts={3}
      />
    </>
  );
}

export default App;
