import { createContext, useContext } from "react";
import type { PreguntasContextType } from "@/types/Preguntas/types";



export const PreguntasContext = createContext<PreguntasContextType>({
    preguntas: [],
    setPreguntas: () => { },
    obtenerPreguntas: () => Promise.resolve(),
    ordenarPreguntas: () => []
});

export function usePreguntasContext() {
    const { preguntas, setPreguntas, obtenerPreguntas, ordenarPreguntas } = useContext(PreguntasContext);
    return { preguntas, setPreguntas, obtenerPreguntas, ordenarPreguntas };
}



