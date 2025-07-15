import { createContext, type Dispatch, type SetStateAction } from "react";
import { } from "sonner";
import type { Comentario } from "@/types";

interface ComentariosContextType {
    comentarios: Comentario[];
    setComentarios: Dispatch<SetStateAction<Comentario[]>>;
    comentariosVisibles: Comentario[];
}


export const ComentariosContext = createContext<ComentariosContextType>({
    comentarios: [],
    setComentarios: () => { },
    comentariosVisibles: [],
});


