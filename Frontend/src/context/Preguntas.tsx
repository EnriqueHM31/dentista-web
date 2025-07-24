import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { PreguntaProps } from "@/types/Preguntas/types";

interface PreguntasContextType {
    preguntas: PreguntaProps[];
    setPreguntas: Dispatch<SetStateAction<PreguntaProps[]>>;
    obtenerPreguntas: () => Promise<void>;
    ordenarPreguntas: (preguntas: PreguntaProps[]) => PreguntaProps[];
}

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



