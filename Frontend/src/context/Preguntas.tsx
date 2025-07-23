import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Pregunta } from "@/types";

interface PreguntasContextType {
    preguntas: Pregunta[];
    setPreguntas: Dispatch<SetStateAction<Pregunta[]>>;
    obtenerPreguntas: () => Promise<void>;
    ordenarPreguntas: (preguntas: Pregunta[]) => Pregunta[];
}

export const PreguntasContext = createContext<PreguntasContextType>({
    preguntas: [],
    setPreguntas: () => { },
    obtenerPreguntas: () => Promise.resolve(),
    ordenarPreguntas: () => []
});

