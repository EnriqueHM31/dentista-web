import type { UUID } from "crypto";
import type { ComentariosActualizarProps } from "@/types/Comentarios/types";

export function actualizacionesDisponiblesComentarios({ seleccionados, originalComentarios }: ComentariosActualizarProps) {
    return Object.entries(seleccionados)
        .filter(([id, nuevoVisible]) => originalComentarios[id as UUID] !== nuevoVisible)
        .map(([id, visible]) => ({ id: id as UUID, visible }));
}