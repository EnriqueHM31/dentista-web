import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import { } from "sonner";
import type { ComentarioProps } from "@/types/Comentarios/types";


export interface Filtros {
    ordenar: "asc" | "desc" | null;
    ranking: number | null;
    seleccion: "checkeados" | "no_checkeados" | null;
}

interface ComentariosContextType {
    comentarios: ComentarioProps[];
    setComentarios: Dispatch<SetStateAction<ComentarioProps[]>>;
    comentariosVisibles: ComentarioProps[];
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

export function useComentariosContext() {
    const { comentarios, setComentarios, comentariosVisibles, setFiltros, filtros } = useContext(ComentariosContext);
    return { comentarios, setComentarios, comentariosVisibles, setFiltros, filtros };
}


