import { getServicios } from "@/services/Servicios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { ServicioContext } from "@/context/Servicio";
import type { ServicioResponse } from "@/types";

export const ServicioProvider = ({ children }: { children: React.ReactNode }) => {
    const [servicios, setServicios] = useState<ServicioResponse[]>([]);

    useEffect(() => {
        obtenerServicios();
    }, []);

    const obtenerServicios = async () => {
        const { success, message } = await getServicios();
        if (!success) {
            toast.error("Error al cargar servicios");
            return;
        }
        setServicios(message);
    };

    return (
        <ServicioContext.Provider value={{ servicios, setServicios }}>
            {children}
        </ServicioContext.Provider>
    );
};