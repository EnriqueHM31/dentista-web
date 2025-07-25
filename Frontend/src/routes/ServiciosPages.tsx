// layouts/ServiciosLayout.tsx
import { Outlet } from "react-router-dom";
import { ServicioProvider } from "@/provider/Servicios";
import { SocialesProvider } from "@/provider/Sociales";

export default function ServiciosPages() {
    return (
        <ServicioProvider>
            <SocialesProvider>
                <Outlet />
            </SocialesProvider>
        </ServicioProvider>
    );
}
