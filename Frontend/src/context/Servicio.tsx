import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { ServicioResponse } from "@/types";
import { getServicios } from "@/services/Servicios";
import { toast } from "sonner";


interface ServicioContextType {
    servicios: ServicioResponse[];
    setServicios: Dispatch<SetStateAction<ServicioResponse[]>>;
}

export const ServicioContext = createContext<ServicioContextType>({
    servicios: [],
    setServicios: () => { }
});


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