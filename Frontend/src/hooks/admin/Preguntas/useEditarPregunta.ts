import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import { usePreguntasContext } from "@/context/Preguntas";
import { updatePregunta } from "@/services/Preguntas";
import type { PreguntaProps } from "@/types/Preguntas/types";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { sonPreguntasIguales } from "@/utils/Cambios";

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

    const handleEditarCampoPregunta = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
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
            onConfirmar: async () => editarPregunta({ preguntaSeleccionada }),
            textoCancelar: "Cancelar",
            onCancelar: () => {
                toast.dismiss();
            },
        })

    };

    async function editarPregunta({ preguntaSeleccionada }: { preguntaSeleccionada: PreguntaProps }) {
        try {
            const { id, pregunta, respuesta } = preguntaSeleccionada;

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
    }

    return {
        handleClickEditar,
        handleEditarCampoPregunta,
        handleEditarPregunta,
        preguntaSeleccionada,
        handledescartarCambios,
    };
}
