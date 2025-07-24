import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PreguntasContext } from "@/context/Preguntas";
import { getDataPreguntas } from "@/services/Preguntas";
import type { PreguntaProps } from "@/types/Preguntas/types";

export const PreguntasProvider = ({ children }: { children: React.ReactNode }) => {
    const [preguntas, setPreguntas] = useState<PreguntaProps[]>([]);


    const obtenerPreguntas = async () => {
        const { success, message } = await getDataPreguntas();
        if (!success) {
            toast.error("Error al cargar preguntas");
            return;
        }
        setPreguntas(message.sort((a: PreguntaProps, b: PreguntaProps) => a.pregunta.localeCompare(b.pregunta)));
    };

    useEffect(() => {
        obtenerPreguntas();
    }, []);

    const ordenarPreguntas = (preguntas: PreguntaProps[]) => {
        return preguntas.sort((a: PreguntaProps, b: PreguntaProps) => a.pregunta.localeCompare(b.pregunta));
    }




    return (
        <PreguntasContext.Provider value={{ preguntas, setPreguntas, obtenerPreguntas, ordenarPreguntas }}>
            {children}
        </PreguntasContext.Provider>
    );
};