import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ComentariosContext } from "@/context/Comentarios";
import { getComentarios } from "@/services/Comentarios";


interface Comentario {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    ranking: number;
    visible: boolean | number;
}
export function ComentariosProvider({ children }: { children: React.ReactNode }) {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);

    useEffect(() => {
        const obtenerComentarios = async () => {
            const { success, message } = await getComentarios();

            if (success) {
                setComentarios(message);

            } else {
                toast.error(message);
            }
        };

        obtenerComentarios();
    }, []);
    const comentariosVisibles = comentarios.filter((comentario) => comentario.visible === true || comentario.visible === 1);

    return (
        <ComentariosContext.Provider value={{ comentarios, setComentarios, comentariosVisibles }}>
            {children}
        </ComentariosContext.Provider>
    );
}