import { useEffect } from "react";
import { toast } from "sonner";
import { useState } from "react";
import type { Pregunta } from "@/types";

export function usePreguntas() {

    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [expandedIds, setExpandedIds] = useState<number[]>([]);

    const obtenerPreguntas = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/preguntas`);
            const { message } = await res.json();
            if (!Array.isArray(message)) throw new Error("Formato inválido");
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
            await fetch(`${import.meta.env.VITE_API_URL}/preguntas/${id}`, {
                method: "DELETE",
            });
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