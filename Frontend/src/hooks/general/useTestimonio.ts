import { ComentariosContext } from "@/context/Comentarios";
import { useContext } from "react";
import { toast } from "sonner";
import { deleteComentario } from "@/services/Comentarios";

export function useTestimonio() {
    function getRandomPortraitUrl(index: number) {
        const gender = Math.random() < 0.5 ? "men" : "women";
        return `https://randomuser.me/api/portraits/${gender}/${index % 100}.jpg`;
    }
    const { setComentarios } = useContext(ComentariosContext);

    const handleEliminarComentario = (id: `${string}-${string}-${string}-${string}-${string}`) => {
        toast("¿Estás seguro de que quieres eliminar el comentario?", {
            action: {
                label: "Eliminar",
                onClick: async () => {
                    try {

                        const { success, message } = await deleteComentario(id);

                        if (!success) {
                            toast.error(message || "No se pudo eliminar el comentario");
                            return;
                        }

                        toast.success("Comentario eliminado");
                        setComentarios(prev => prev.filter(c => c.id !== id));
                    } catch (error) {
                        toast.error("Error al eliminar el comentario");
                        console.error(error);
                    }
                },
            },
            cancel: {
                label: "Cancelar",
                onClick: () => {
                    toast.dismiss();
                },
            },
        });
    };

    return { getRandomPortraitUrl, handleEliminarComentario };
}