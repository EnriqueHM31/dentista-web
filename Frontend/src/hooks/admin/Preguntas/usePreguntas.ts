import { toast } from "sonner";
import { useState } from "react";
import { deletePregunta } from "@/services/Preguntas";
import { usePreguntasContext } from "@/context/Preguntas";
import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import type { UUID } from "@/types/types";


export function usePreguntas() {
    const { refrescarPreguntasEliminar } = usePreguntasContext();
    const [expandedIds, setExpandedIds] = useState<UUID[]>([]);

    const toggleExpand = (id: UUID) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleClickEliminarPregunta = async (id: UUID) => {

        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro de querer eliminar esta pregunta?",
            textoAccion: "Eliminar",
            onConfirmar: async () => eliminarPregunta({ id }),
            textoCancelar: "Cancelar",
            onCancelar: () => toast.dismiss("Cancelando eliminación"),
        });
    }

    async function eliminarPregunta({ id }: { id: UUID }) {
        try {
            const { success, message } = await deletePregunta(id);
            if (!success) {
                toast.error(message);
                return;
            }
            refrescarPreguntasEliminar(id);
            toast.success("Pregunta eliminada");
        } catch (err) {
            toast.error("Error al eliminar pregunta: " + err);
        }
    }

    return {
        toggleExpand,
        handleClickEliminarPregunta,
        expandedIds,
    };

}