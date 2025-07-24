import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { ServicioResponse } from "@/types";


interface ServicioContextType {
    servicios: ServicioResponse[];
    setServicios: Dispatch<SetStateAction<ServicioResponse[]>>;
    serviciosDisponibles: ServicioResponse[];
    setServiciosDisponibles: Dispatch<SetStateAction<ServicioResponse[]>>;
}

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


