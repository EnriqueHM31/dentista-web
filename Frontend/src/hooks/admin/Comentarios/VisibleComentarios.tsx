import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
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

    const comentarioModificado = (id: string): boolean => {
        return seleccionados[id] !== comentariosOriginalesRef.current[id];
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

            mostrarToastConfirmacion({
                mensaje: "¿Estás seguro de querer guardar los cambios?",
                textoAccion: "Guardar",
                onConfirmar: async () => {
                    const comentariosActualizados = await Promise.all(
                        actualizaciones.map(({ id, visible }) =>
                            updateComentarioVisibilidad({
                                id: id as `${string}-${string}-${string}-${string}-${string}`,
                                visible
                            }).then(respuesta => respuesta.comentario[0])
                        )
                    );

                    const nuevosOriginales: Record<string, boolean> = { ...comentariosOriginalesRef.current };
                    const nuevosRef: ComentarioProps[] = [...comentariosRef.current];

                    comentariosActualizados.forEach((nuevoComentario) => {
                        nuevosOriginales[nuevoComentario.id] = nuevoComentario.visible === 1;

                        const index = nuevosRef.findIndex((c) => c.id === nuevoComentario.id);

                        if (index !== -1) {
                            nuevosRef[index] = {
                                ...nuevosRef[index],
                                visible: nuevoComentario.visible,
                            };
                        }
                    });

                    comentariosOriginalesRef.current = nuevosOriginales;
                    comentariosRef.current = nuevosRef;
                    setSeleccionados(nuevosOriginales);

                    toast.success("Cambios guardados correctamente");
                },
                textoCancelar: "Cancelar",
                onCancelar: () => {
                    toast.info("No hay cambios para guardar");
                }
            });

        } catch {
            toast.error("Error al guardar los cambios");
        }
    };

    return {
        seleccionados,
        toggleCheck,
        guardarSeleccion,
        comentariosRef,
        comentarioModificado,
    };
}
