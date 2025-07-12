import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";


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



export function ComentariosProvider({ children }: { children: React.ReactNode }) {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);

    useEffect(() => {
        const fetchComentarios = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/comentarios`);
            const { success, message } = await response.json();

            if (success) {
                setComentarios(message);

            } else {
                toast.error(message);
            }
        };

        fetchComentarios();
    }, []);
    const comentariosVisibles = comentarios.filter((comentario) => comentario.visible === true || comentario.visible === 1);





    return (
        <ComentariosContext.Provider value={{ comentarios, setComentarios, comentariosVisibles }}>
            {children}
        </ComentariosContext.Provider>
    );
}