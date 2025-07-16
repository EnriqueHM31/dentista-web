
import { PreguntasContext } from "@/context/Preguntas";
import { updatePregunta } from "@/services/Preguntas";
import type { Pregunta } from "@/types";
import { useContext, useState } from "react";
import { toast } from "sonner";


export function useEditarPregunta() {
    const { setPreguntas } = useContext(PreguntasContext);
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


    const handleEditarPregunta = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toastId = toast.loading("Guardando cambios...");
        try {
            if (!preguntaSeleccionada) {
                toast.error("No hay pregunta seleccionada", { id: toastId });
                return;
            }

            const { success, message } = await updatePregunta(preguntaSeleccionada?.id, preguntaSeleccionada?.pregunta, preguntaSeleccionada?.respuesta);


            if (!success) {
                toast.error(message, { id: toastId });
                return;
            }
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

    return {
        handleClickEditar,
        handleClickModalEditarPregunta,
        handleClickModalEditarRespuesta,
        handleEditarPregunta,
        preguntaSeleccionada
    }

}