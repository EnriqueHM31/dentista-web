import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import { usePreguntasContext } from "@/context/Preguntas";
import { updatePregunta } from "@/services/Preguntas";
import type { PreguntaProps } from "@/types/Preguntas/types";
import { useRef, useState } from "react";
import { toast } from "sonner";

// Función reutilizable para comparar dos preguntas
function sonPreguntasIguales(a: PreguntaProps | null, b: PreguntaProps | null): boolean {
    if (!a || !b) return false;
    return a.id === b.id && a.pregunta === b.pregunta && a.respuesta === b.respuesta;
}

export function useEditarPregunta(handleClickDesactivarModal: () => void) {
    const { refrescarPreguntasEditar } = usePreguntasContext();
    const preguntaRef = useRef<PreguntaProps | null>(null);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState<PreguntaProps | null>(null);

    const handledescartarCambios = () => {

        if (sonPreguntasIguales(preguntaSeleccionada, preguntaRef.current)) {
            handleClickDesactivarModal();
        } else {
            mostrarToastConfirmacion({
                mensaje: "¿Estás seguro de deshacer los cambios?",
                textoAccion: "Deshacer",
                onConfirmar: () => {
                    // Restaurar los valores originales
                    setPreguntaSeleccionada(preguntaRef.current);
                    handleClickDesactivarModal();
                },
            });
        }
    };

    const handleEditarCampoPregunta = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        console.log({ name, value });
        setPreguntaSeleccionada(prev => ({ ...prev, [name]: value } as PreguntaProps));
    };

    const handleClickEditar = ({ id, pregunta, respuesta }: PreguntaProps) => {
        setPreguntaSeleccionada({ id, pregunta, respuesta });
        preguntaRef.current = { id, pregunta, respuesta };
    };

    const handleEditarPregunta = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!preguntaSeleccionada) {
            toast.error("No hay pregunta seleccionada");
            return;
        }

        if (sonPreguntasIguales(preguntaSeleccionada, preguntaRef.current)) {
            toast.info("No hay cambios para guardar");
            return;
        }

        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro de guardar los cambios?",
            textoAccion: "Guardar",
            onConfirmar: async () => {
                const { id, pregunta, respuesta } = preguntaSeleccionada;

                try {
                    const { success, message } = await updatePregunta(id, pregunta, respuesta);

                    if (!success) {
                        toast.error(message);
                        return;
                    }

                    // Actualiza el contexto de preguntas
                    refrescarPreguntasEditar(preguntaSeleccionada, id);
                    preguntaRef.current = { ...preguntaSeleccionada };

                    toast.success("Cambios guardados exitosamente");
                    handleClickDesactivarModal();
                } catch {
                    toast.error("Error al guardar los cambios ");
                }
            },
            textoCancelar: "Cancelar",
            onCancelar: () => {
                toast.dismiss();
            },
        })

    };

    return {
        handleClickEditar,
        handleEditarCampoPregunta,
        handleEditarPregunta,
        preguntaSeleccionada,
        handledescartarCambios,
    };
}
