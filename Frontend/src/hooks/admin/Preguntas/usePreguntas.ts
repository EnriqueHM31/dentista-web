import { useEffect } from "react";
import { toast } from "sonner";
import { useState } from "react";
import type { Pregunta } from "@/types";
import { deletePregunta, getDataPreguntas } from "@/services/Preguntas";

export function usePreguntas() {

    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [expandedIds, setExpandedIds] = useState<number[]>([]);

    const obtenerPreguntas = async () => {
        try {
            const { success, message } = await getDataPreguntas();

            if (!success) {
                toast.error("Error al cargar preguntas");
                return;
            }
            setPreguntas(message);
        } catch (err) {
            console.error(err);
            toast.error("Error al cargar preguntas");
        }
    };

    useEffect(() => {
        obtenerPreguntas();
    }, []);


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
        obtenerPreguntas,
        refrescarPreguntaEditada
    };

}