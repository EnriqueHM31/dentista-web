import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { ServicioProps } from "@/types/Servicios/types";


interface ServicioContextType {
    servicios: ServicioProps[];
    setServicios: Dispatch<SetStateAction<ServicioProps[]>>;
    serviciosDisponibles: ServicioProps[];
    setServiciosDisponibles: Dispatch<SetStateAction<ServicioProps[]>>;
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


