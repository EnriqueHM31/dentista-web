import { createContext, useContext } from "react";
import { } from "sonner";
import type { ComentariosContextTypeProps } from "@/types/Comentarios/types";


export const ComentariosContext = createContext<ComentariosContextTypeProps>({
    comentarios: [],
    setComentarios: () => { },
    comentariosVisibles: [],
    filtros: {
        ordenar: null,
        ranking: null,
        seleccion: null,
    },
    setFiltros: () => { },
    refrescarComentariosEliminar: () => { },
    refrescarComentariosEditar: () => { },
});

export function useComentariosContext() {
    const { comentarios, setComentarios, comentariosVisibles, setFiltros, filtros, refrescarComentariosEliminar, refrescarComentariosEditar } = useContext(ComentariosContext);
    return { comentarios, setComentarios, comentariosVisibles, setFiltros, filtros, refrescarComentariosEliminar, refrescarComentariosEditar };
}


