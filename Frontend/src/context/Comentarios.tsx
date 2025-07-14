import { createContext, type Dispatch, type SetStateAction } from "react";
import { } from "sonner";


interface Comentario {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    ranking: number;
    visible: boolean | number;
}

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


