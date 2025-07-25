import { createContext, useContext } from "react";
import type { ServicioContextType } from "@/types/Servicios/types";

export const ServicioContext = createContext<ServicioContextType>({
    servicios: [],
    setServicios: () => { },
    serviciosDisponibles: [],
    setServiciosDisponibles: () => { }
});

export function useServicioContext() {
    const { servicios, setServicios, serviciosDisponibles, setServiciosDisponibles } = useContext(ServicioContext);
    return { servicios, setServicios, serviciosDisponibles, setServiciosDisponibles };
}


