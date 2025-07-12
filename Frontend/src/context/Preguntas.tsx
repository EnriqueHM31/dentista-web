import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Pregunta } from "@/types";
import { getDataPreguntas } from "@/services/Preguntas";
import { toast } from "sonner";

interface PreguntasContextType {
    preguntas: Pregunta[];
    setPreguntas: Dispatch<SetStateAction<Pregunta[]>>;
    obtenerPreguntas: () => Promise<void>;
}

export const PreguntasContext = createContext<PreguntasContextType>({
    preguntas: [],
    setPreguntas: () => { },
    obtenerPreguntas: () => Promise.resolve()
});

export const PreguntasProvider = ({ children }: { children: React.ReactNode }) => {
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);


    const obtenerPreguntas = async () => {
        const { success, message } = await getDataPreguntas();
        if (!success) {
            toast.error("Error al cargar preguntas");
            return;
        }
        setPreguntas(message);
    };

    useEffect(() => {
        obtenerPreguntas();
    }, []);

    return (
        <PreguntasContext.Provider value={{ preguntas, setPreguntas, obtenerPreguntas }}>
            {children}
        </PreguntasContext.Provider>
    );
};