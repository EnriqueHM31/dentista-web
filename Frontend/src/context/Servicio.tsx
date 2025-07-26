import { createContext, useContext } from "react";
import type { ServicioContextType } from "@/types/Servicios/types";

export const ServicioContext = createContext<ServicioContextType>({
    servicios: [],
    setServicios: () => { },
    serviciosDisponibles: [],
    setServiciosDisponibles: () => { },
    refrescarServiciosCrear: () => { },
    refrescarServiciosEditar: () => { },
    refrescarServiciosEliminar: () => { },
});

export function useServicioContext() {
    const { servicios, setServicios, serviciosDisponibles, setServiciosDisponibles, refrescarServiciosCrear, refrescarServiciosEditar, refrescarServiciosEliminar } = useContext(ServicioContext);
    return { servicios, setServicios, serviciosDisponibles, setServiciosDisponibles, refrescarServiciosCrear, refrescarServiciosEditar, refrescarServiciosEliminar };
}


