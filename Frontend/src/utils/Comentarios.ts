import type { UUID } from "crypto";

interface ComentariosActualizarProps {
    seleccionados: Record<UUID, boolean>;
    originalComentarios: Record<UUID, boolean>;
}

export function actualizacionesDisponiblesComentarios({ seleccionados, originalComentarios }: ComentariosActualizarProps) {
    return Object.entries(seleccionados)
        .filter(([id, nuevoVisible]) => originalComentarios[id as UUID] !== nuevoVisible)
        .map(([id, visible]) => ({ id: id as UUID, visible }));
}