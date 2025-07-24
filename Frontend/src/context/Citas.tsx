import { createContext, type Dispatch, type SetStateAction } from "react";
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


