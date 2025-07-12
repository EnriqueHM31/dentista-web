import { useContext } from "react";
import { toast } from "sonner";
import { useState } from "react";
import type { Pregunta } from "@/types";
import { deletePregunta } from "@/services/Preguntas";
import { PreguntasContext } from "@/context/Preguntas";

export function usePreguntas() {
    const { preguntas, setPreguntas } = useContext(PreguntasContext);
    const [expandedIds, setExpandedIds] = useState<number[]>([]);

    const refrescarPreguntaEditada = async (preguntaSeleccionada: Pregunta) => {
        setPreguntas(prev =>
            prev.map(p =>
                p.id === preguntaSeleccionada?.id ? { ...p, ...preguntaSeleccionada } : p
            )
        );
    }

    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };


    const handleClickEliminarPregunta = async (id: number) => {

        try {
            const { success, message } = await deletePregunta(id);

            if (!success) {
                toast.error(message);
                return;
            }
            setPreguntas(prev => prev.filter(p => p.id !== id));
            toast.success("Pregunta eliminada");
        } catch (err) {
            toast.error("Error al eliminar pregunta" + err);
        }
    }

    return {
        preguntas,
        toggleExpand,
        handleClickEliminarPregunta,
        expandedIds,
        refrescarPreguntaEditada
    };

}