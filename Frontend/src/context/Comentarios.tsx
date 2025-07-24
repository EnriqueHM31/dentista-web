import { createContext, type Dispatch, type SetStateAction } from "react";
import { } from "sonner";
import type { Comentario } from "@/types";


export interface Filtros {
    ordenar: "asc" | "desc" | null;
    ranking: number | null;
    seleccion: "checkeados" | "no_checkeados" | null;
}

interface ComentariosContextType {
    comentarios: Comentario[];
    setComentarios: Dispatch<SetStateAction<Comentario[]>>;
    comentariosVisibles: Comentario[];
    setFiltros: (filtros: Partial<Filtros>) => void;
    filtros: Filtros;
}


export const ComentariosContext = createContext<ComentariosContextType>({
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


