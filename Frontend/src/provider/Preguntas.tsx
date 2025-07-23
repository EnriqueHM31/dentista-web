import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PreguntasContext } from "@/context/Preguntas";
import { getDataPreguntas } from "@/services/Preguntas";
import type { Pregunta } from "@/types";

export const PreguntasProvider = ({ children }: { children: React.ReactNode }) => {
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);


    const obtenerPreguntas = async () => {
        const { success, message } = await getDataPreguntas();
        if (!success) {
            toast.error("Error al cargar preguntas");
            return;
        }
        setPreguntas(message.sort((a: Pregunta, b: Pregunta) => a.pregunta.localeCompare(b.pregunta)));
    };

    useEffect(() => {
        obtenerPreguntas();
    }, []);

    const ordenarPreguntas = (preguntas: Pregunta[]) => {
        return preguntas.sort((a: Pregunta, b: Pregunta) => a.pregunta.localeCompare(b.pregunta));
    }




    return (
        <PreguntasContext.Provider value={{ preguntas, setPreguntas, obtenerPreguntas, ordenarPreguntas }}>
            {children}
        </PreguntasContext.Provider>
    );
};