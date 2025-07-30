import { PreguntasContext } from "@/context/Preguntas";
import { getDataPreguntas } from "@/services/Preguntas";
import type { PreguntaProps } from "@/types/Preguntas/types";
import type { UUID } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const PreguntasProvider = ({ children }: { children: React.ReactNode }) => {
    const [preguntas, setPreguntas] = useState<PreguntaProps[]>([]);


    const obtenerPreguntas = async () => {
        const { success, message, preguntas } = await getDataPreguntas();
        if (!success) {
            toast.error(message);
            return;
        }
        setPreguntas(preguntas.sort((a: PreguntaProps, b: PreguntaProps) => a.pregunta.localeCompare(b.pregunta)));
    };

    useEffect(() => {
        obtenerPreguntas();
    }, []);

    const ordenarPreguntas = (preguntas: PreguntaProps[]) => {
        return preguntas.sort((a: PreguntaProps, b: PreguntaProps) => a.pregunta.localeCompare(b.pregunta));
    }

    const refrescarPreguntasCrear = (preguntaCreada: PreguntaProps) => {
        setPreguntas(prev => [...ordenarPreguntas([...prev, preguntaCreada])]);
    }

    const refrescarPreguntasEditar = (preguntaSeleccionada: PreguntaProps, id: UUID) => {
        setPreguntas(prev =>
            prev.map(pregunta =>
                pregunta.id === id
                    ? { ...pregunta, ...preguntaSeleccionada }
                    : pregunta
            )
        );
    }

    const refrescarPreguntasEliminar = (id: UUID) => {
        setPreguntas(prev => prev.filter(p => p.id !== id));
    }

    return (
        <PreguntasContext.Provider value={{ preguntas, setPreguntas, obtenerPreguntas, ordenarPreguntas, refrescarPreguntasCrear, refrescarPreguntasEditar, refrescarPreguntasEliminar }}>
            {children}
        </PreguntasContext.Provider>
    );
};