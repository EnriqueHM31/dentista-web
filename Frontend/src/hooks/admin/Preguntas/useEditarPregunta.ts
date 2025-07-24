import { usePreguntasContext } from "@/context/Preguntas";
import { updatePregunta } from "@/services/Preguntas";
import type { Pregunta } from "@/types";
import { useRef, useState } from "react";
import { toast } from "sonner";

// Función reutilizable para comparar dos preguntas
function sonPreguntasIguales(a: Pregunta | null, b: Pregunta | null): boolean {
    if (!a || !b) return false;
    return a.id === b.id && a.pregunta === b.pregunta && a.respuesta === b.respuesta;
}

export function useEditarPregunta(handleClickDesactivarModal: () => void) {
    const { setPreguntas } = usePreguntasContext();

    const preguntaRef = useRef<Pregunta | null>(null);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState<Pregunta | null>(null);

    const handledescartarCambios = () => {

        if (sonPreguntasIguales(preguntaSeleccionada, preguntaRef.current)) {
            handleClickDesactivarModal();
        } else {
            toast("¿Estás seguro de deshacer los cambios?", {
                action: {
                    label: "Deshacer",
                    onClick: () => {
                        // Restaurar los valores originales
                        setPreguntaSeleccionada(preguntaRef.current);
                        handleClickDesactivarModal();
                    },
                },
                cancel: {
                    label: "Cancelar",
                    onClick: () => toast.dismiss(),
                },
            });
        }
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

    const handleClickEditar = ({ id, pregunta, respuesta }: Pregunta) => {
        setPreguntaSeleccionada({ id, pregunta, respuesta });
        preguntaRef.current = { id, pregunta, respuesta };
    };

    const handleEditarPregunta = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toastId = toast.loading("Guardando cambios...");

        if (!preguntaSeleccionada) {
            toast.error("No hay pregunta seleccionada", { id: toastId });
            return;
        }

        try {
            const { success, message } = await updatePregunta(
                preguntaSeleccionada.id,
                preguntaSeleccionada.pregunta,
                preguntaSeleccionada.respuesta
            );

            if (!success) {
                toast.error(message, { id: toastId });
                return;
            }

            // Actualiza el contexto de preguntas
            setPreguntas(prev =>
                prev.map(p =>
                    p.id === preguntaSeleccionada.id
                        ? { ...p, ...preguntaSeleccionada }
                        : p
                )
            );

            // Actualiza la referencia original
            preguntaRef.current = { ...preguntaSeleccionada };

            toast.success("Cambios guardados exitosamente", { id: toastId });
            handleClickDesactivarModal();
        } catch (err) {
            toast.error("Error al guardar los cambios: " + err, { id: toastId });
        }
    };

    return {
        handleClickEditar,
        handleClickModalEditarPregunta,
        handleClickModalEditarRespuesta,
        handleEditarPregunta,
        preguntaSeleccionada,
        handledescartarCambios,
    };
}
