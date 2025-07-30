// layouts/ServiciosLayout.tsx
import CitasProvider from "@/provider/Citas";
import { ServicioProvider } from "@/provider/Servicios";
import { SocialesProvider } from "@/provider/Sociales";
import { Outlet } from "react-router-dom";

export default function ServiciosPages() {
    return (
        <ServicioProvider>
            <SocialesProvider>
                <CitasProvider>
                    <Outlet />
                </CitasProvider>
            </SocialesProvider>
        </ServicioProvider>
    );
}
