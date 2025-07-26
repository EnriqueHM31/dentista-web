import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import { useComentariosContext } from "@/context/Comentarios";
import { updateComentarioVisibilidad } from "@/services/Comentarios";
import type { ArrayComentariosProps, ComentarioProps } from "@/types/Comentarios/types";
import type { UUID } from "@/types/types";
import { actualizacionesDisponiblesComentarios } from "@/utils/Comentarios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type VisibilidadMap = Record<UUID, boolean>;

type ArrayVisiblesComentarios = Array<{ id: UUID; visible: boolean }>;

export default function useVisibleComentarios({ comentarios }: ArrayComentariosProps) {
    const [seleccionados, setSeleccionados] = useState<VisibilidadMap>({});
    const comentariosRef = useRef<ComentarioProps[]>(comentarios);
    const comentariosOriginalesRef = useRef<VisibilidadMap>({});
    const { refrescarComentariosEditar } = useComentariosContext();

    useEffect(() => {
        comentariosRef.current = comentarios;

        const visiblesOriginales: VisibilidadMap = Object.fromEntries(
            comentarios.map((c) => [c.id, !!c.visible])
        );

        comentariosOriginalesRef.current = visiblesOriginales;
        setSeleccionados(visiblesOriginales);
    }, [comentarios]);

    const toggleCheck = (id: UUID) => {
        setSeleccionados((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const comentarioModificado = (id: UUID): boolean => {
        return seleccionados[id] !== comentariosOriginalesRef.current[id];
    };

    const guardarSeleccion = async () => {
        const original = comentariosOriginalesRef.current;

        const actualizaciones = actualizacionesDisponiblesComentarios({ seleccionados, originalComentarios: original });

        if (actualizaciones.length === 0) {
            toast.info("No hay cambios para guardar");
            return;
        }

        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro de querer guardar los cambios?",
            textoAccion: "Guardar",
            onConfirmar: async () => actualizarVisibilidadComentarios({ actualizaciones }),
            textoCancelar: "Cancelar",
            onCancelar: () => {
                toast.dismiss();
            },
        });

    }

    async function actualizarVisibilidadComentarios({ actualizaciones }: { actualizaciones: ArrayVisiblesComentarios }) {
        try {
            const comentariosActualizados = await Promise.all(
                actualizaciones.map(({ id, visible }) =>
                    updateComentarioVisibilidad({ id, visible }).then(
                        (respuesta) => respuesta.comentario[0]
                    )
                )
            );

            const nuevosOriginales: VisibilidadMap = { ...comentariosOriginalesRef.current };
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

            refrescarComentariosEditar(nuevosRef);

            toast.success("Cambios guardados correctamente");
        } catch {
            toast.error("Error al guardar los cambios");
        }
    }

    return {
        seleccionados,
        toggleCheck,
        guardarSeleccion,
        comentariosRef,
        comentarioModificado,
    };
}


