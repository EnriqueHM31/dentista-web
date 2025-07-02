
import type { Pregunta } from "@/types";
import { useState } from "react";
import { toast } from "sonner";


export function useEditarPregunta() {
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState<Pregunta | null>(null);


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


    const handleClickEditar = ({ id, pregunta, respuesta }: Pregunta) => {
        setPreguntaSeleccionada({ id, pregunta, respuesta });
    }


    const handleGuardarPreguntaModificada = async (e: React.FormEvent<HTMLFormElement>) => {
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



            toast.success("Cambios guardados exitosamente", { id: toastId });
        } catch (err) {
            toast.error("Error al guardar los cambios " + err, { id: toastId });
        }
    };

    return {
        handleClickEditar,
        handleClickModalEditarPregunta,
        handleClickModalEditarRespuesta,
        handleGuardarPreguntaModificada,
        preguntaSeleccionada
    }

}