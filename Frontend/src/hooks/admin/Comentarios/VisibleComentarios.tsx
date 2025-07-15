import { updateComentarioVisibilidad } from "@/services/Comentarios";
import type { Comentario } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface useVisibleComentariosProps {
    comentarios: Comentario[];
}

export default function useVisibleComentarios({ comentarios }: useVisibleComentariosProps) {
    const [seleccionados, setSeleccionados] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (comentarios.length > 0) {
            const inicial = Object.fromEntries(
                comentarios.map((c) => [c.id, !!c.visible])
            );
            setSeleccionados(inicial);
        }
    }, [comentarios]);



    // Alterna el estado del checkbox
    const toggleCheck = (index: number) => {
        const id = comentarios[index].id;
        setSeleccionados((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Envía los cambios al backend
    const guardarSeleccion = async () => {
        try {
            const actualizaciones = comentarios.map((c) => ({
                id: c.id,
                visible: !!seleccionados[c.id],
            }));

            await Promise.all(
                actualizaciones.map(({ id, visible }) =>
                    updateComentarioVisibilidad({ id, visible })
                )
            );

            toast.success("Cambios guardados correctamente");
        } catch {
            toast.error("Error al guardar los cambios");
        }
    };

    return {
        seleccionados,
        toggleCheck,
        guardarSeleccion,
    }

}