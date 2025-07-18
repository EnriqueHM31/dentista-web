import { createContext, type Dispatch, type SetStateAction } from "react";
import type { ServicioResponse } from "@/types";


interface ServicioContextType {
    servicios: ServicioResponse[];
    setServicios: Dispatch<SetStateAction<ServicioResponse[]>>;
}

export const ServicioContext = createContext<ServicioContextType>({
    servicios: [],
    setServicios: () => { }
});


