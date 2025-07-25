import { updateComentarioVisibilidad } from "@/services/Comentarios";
import type { ArrayComentariosProps, ComentarioProps } from "@/types/Comentarios/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function useVisibleComentarios({ comentarios }: ArrayComentariosProps) {
    const [seleccionados, setSeleccionados] = useState<Record<string, boolean>>({});
    const comentariosRef = useRef<ComentarioProps[]>(comentarios);
    const comentariosOriginalesRef = useRef<Record<string, boolean>>({});

    useEffect(() => {
        comentariosRef.current = comentarios;

        const visiblesOriginales = Object.fromEntries(
            comentarios.map((c) => [c.id, !!c.visible])
        );

        comentariosOriginalesRef.current = visiblesOriginales;
        setSeleccionados(visiblesOriginales);
    }, [comentarios]);

    const toggleCheck = (id: string) => {
        setSeleccionados((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const guardarSeleccion = async () => {
        try {
            const original = comentariosOriginalesRef.current;

            const actualizaciones = Object.entries(seleccionados)
                .filter(([id, nuevoVisible]) => original[id] !== nuevoVisible)
                .map(([id, visible]) => ({ id, visible }));

            if (actualizaciones.length === 0) {
                toast.info("No hay cambios para guardar");
                return;
            }

            // Llamamos a updateComentarioVisibilidad y esperamos la respuesta con el comentario actualizado
            const comentariosActualizados = await Promise.all(
                actualizaciones.map(({ id, visible }) =>
                    updateComentarioVisibilidad({
                        id: id as `${string}-${string}-${string}-${string}-${string}`,
                        visible
                    }).then(respuesta => {
                        // Suponiendo que la respuesta tiene la forma { comentario: { id, visible }, ... }
                        return respuesta.comentario[0];
                    })
                )
            );

            // Actualizar el estado y las referencias con los datos del backend
            const nuevosOriginales: Record<string, boolean> = { ...comentariosOriginalesRef.current };
            const nuevosRef: ComentarioProps[] = [...comentariosRef.current];

            comentariosActualizados.forEach((nuevoComentario) => {
                // Actualizas el objeto de visibilidad original con el nuevo valor
                nuevosOriginales[nuevoComentario.id] = nuevoComentario.visible === 1;

                // Buscas el índice del comentario en el array local
                const index = nuevosRef.findIndex((c) => c.id === nuevoComentario.id);

                if (index !== -1) {
                    // Actualizas sólo la propiedad visible sin perder otros datos
                    nuevosRef[index] = {
                        ...nuevosRef[index],
                        visible: nuevoComentario.visible,
                    };
                }
            });
            comentariosOriginalesRef.current = nuevosOriginales;
            comentariosRef.current = nuevosRef;
            setSeleccionados(nuevosOriginales);

            console.log(comentariosOriginalesRef.current);
            console.log(comentariosRef.current);

            toast.success("Cambios guardados correctamente");
        } catch {
            toast.error("Error al guardar los cambios");
        }
    };

    return {
        seleccionados,
        toggleCheck,
        guardarSeleccion,
        comentariosRef,
    };
}
