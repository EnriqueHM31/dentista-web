import { getServicios, getServiciosDisponibles } from "@/services/Servicios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { ServicioContext } from "@/context/Servicio";
import type { ServicioProps } from "@/types/Servicios/types";

export const ServicioProvider = ({ children }: { children: React.ReactNode }) => {
    const [servicios, setServicios] = useState<ServicioProps[]>([]);
    const [serviciosDisponibles, setServiciosDisponibles] = useState<ServicioProps[]>([]);

    useEffect(() => {
        obtenerServicios();
        obtenerServiciosDisponibles();
    }, []);

    const obtenerServicios = async () => {
        const { success, message } = await getServicios();
        if (!success) {
            toast.error("Error al cargar servicios");
            return;
        }
        setServicios(message);
    };

    const obtenerServiciosDisponibles = async () => {
        const { success, message } = await getServiciosDisponibles();
        if (!success) {
            toast.error("Error al cargar servicios disponibles");
            return;
        }
        setServiciosDisponibles(message);
    };

    return (
        <ServicioContext.Provider value={{ servicios, setServicios, serviciosDisponibles, setServiciosDisponibles }}>
            {children}
        </ServicioContext.Provider>
    );
};