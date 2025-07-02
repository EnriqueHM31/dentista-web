import { useEffect } from "react";
import { toast } from "sonner";
import { useState } from "react";
import type { Pregunta } from "@/types";

export function usePreguntas() {

    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState<Pregunta | null>(null);

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

    const handleGuardar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toastId = toast.loading("Guardando cambios...");
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/preguntas/${preguntaSeleccionada?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pregunta: preguntaSeleccionada?.pregunta,
                    respuesta: preguntaSeleccionada?.respuesta,
                }),
            });

            setPreguntas(prev =>
                prev.map(p =>
                    p.id === preguntaSeleccionada?.id ? { ...p, ...preguntaSeleccionada } : p
                )
            );

            toast.success("Cambios guardados exitosamente", { id: toastId });
        } catch (err) {
            toast.error("Error al guardar los cambios " + err, { id: toastId });
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleClickModalEditarPregunta = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreguntaSeleccionada(prev =>
            prev ? { ...prev, pregunta: e.target.value } : prev
        );
    };

    const handleClickModalEditarRespuesta = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPreguntaSeleccionada(prev =>
            prev ? { ...prev, respuesta: e.target.value } : prev
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

    const handleClickEditar = ({ id, pregunta, respuesta }: Pregunta) => {
        setPreguntaSeleccionada({ id, pregunta, respuesta });
    }



    return {
        preguntas,
        handleGuardar,
        toggleExpand,
        handleClickModalEditarPregunta,
        handleClickModalEditarRespuesta,
        handleClickEliminarPregunta,
        expandedIds,
        preguntaSeleccionada,
        handleClickEditar,
        obtenerPreguntas
    };

}