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
});

export function useComentariosContext() {
    const { comentarios, setComentarios, comentariosVisibles, setFiltros, filtros } = useContext(ComentariosContext);
    return { comentarios, setComentarios, comentariosVisibles, setFiltros, filtros };
}


