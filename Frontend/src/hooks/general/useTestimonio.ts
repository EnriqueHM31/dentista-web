import { useComentariosContext } from "@/context/Comentarios";
import { toast } from "sonner";
import { deleteComentario } from "@/services/Comentarios";
import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import type { UUID } from "@/types/types";

export function useTestimonio() {
    const { setComentarios } = useComentariosContext();

    function getRandomPortraitUrl() {
        return `https://us.123rf.com/450wm/valentint/valentint1602/valentint160203120/52348140-user-profile-icon-internet-button-on-blue-background.webp`;
    }

    const handleEliminarComentario = (id: UUID) => {
        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro de que quieres eliminar el comentario?",
            textoAccion: "Eliminar",
            onConfirmar: async () => {
                try {
                    const { success, message } = await deleteComentario(id);

                    if (!success) {
                        toast.error(message || "No se pudo eliminar el comentario");
                        return;
                    }

                    toast.success("Comentario eliminado");
                    setComentarios(prev => prev.filter(c => c.id !== id));
                } catch {
                    toast.error("Error al eliminar el comentario");
                }
            },
            textoCancelar: "Cancelar",
            onCancelar: () => {
                toast.dismiss();
            },
        });

    };

    return { getRandomPortraitUrl, handleEliminarComentario };
}