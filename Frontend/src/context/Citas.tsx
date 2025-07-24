import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import { } from "sonner";

interface Cita {
    id: string;
    nombre: string;
    email: string;
    servicio: string;
    telefono: string;
    comentarios: string
    fecha: string;
    hora: string
    completada: boolean
}

interface CitasContextType {
    citas: Cita[];
    setCitas: Dispatch<SetStateAction<Cita[]>>;
}

export const CitasContext = createContext<CitasContextType>({
    citas: [],
    setCitas: () => { },
});


export function useCitasContext() {
    const { citas, setCitas } = useContext(CitasContext);
    return { citas, setCitas };
}


