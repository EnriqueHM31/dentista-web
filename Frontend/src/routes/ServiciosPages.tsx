// layouts/ServiciosLayout.tsx
import { Outlet } from "react-router-dom";
import { ServicioProvider } from "@/provider/Servicios";
import { SocialesProvider } from "@/provider/Sociales";
import CitasProvider from "@/provider/Citas";

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
