import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import { useComentariosContext } from "@/context/Comentarios";
import { deleteComentario } from "@/services/Comentarios";
import type { UUID } from "@/types/types";
import { toast } from "sonner";

const IMAGEN_DEFECTO = `https://us.123rf.com/450wm/valentint/valentint1602/valentint160203120/52348140-user-profile-icon-internet-button-on-blue-background.webp`

export function useTestimonio() {
    const { refrescarComentariosEliminar } = useComentariosContext();

    const getRandomPortraitUrl = () => {
        return IMAGEN_DEFECTO;
    }

    const handleEliminarComentario = (id: UUID) => {
        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro de que quieres eliminar el comentario?",
            textoAccion: "Eliminar",
            onConfirmar: async () => eliminarComentario({ id }),
            textoCancelar: "Cancelar",
            onCancelar: () => {
                toast.dismiss();
            },
        });
    };

    async function eliminarComentario({ id }: { id: UUID }) {
        try {
            const { success, message } = await deleteComentario({ id });

            if (!success) {
                toast.error(message || "No se pudo eliminar el comentario");
                return;
            }

            refrescarComentariosEliminar(id);
            toast.success(message || "Comentario eliminado");
        } catch {
            toast.error("Error al eliminar el comentario");
        }
    }

    return { getRandomPortraitUrl, handleEliminarComentario };
}