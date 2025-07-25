import { toast } from "sonner";
import { useState } from "react";
import { deletePregunta } from "@/services/Preguntas";
import { usePreguntasContext } from "@/context/Preguntas";
import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";


export function usePreguntas() {
    const { refrescarPreguntasEliminar } = usePreguntasContext();
    const [expandedIds, setExpandedIds] = useState<`${string}-${string}-${string}-${string}-${string}`[]>([]);

    const toggleExpand = (id: `${string}-${string}-${string}-${string}-${string}`) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleClickEliminarPregunta = async (id: `${string}-${string}-${string}-${string}-${string}`) => {

        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro de querer eliminar esta pregunta?",
            textoAccion: "Eliminar",
            onConfirmar: async () => {
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
            },
        });


    }

    return {
        toggleExpand,
        handleClickEliminarPregunta,
        expandedIds,
    };

}