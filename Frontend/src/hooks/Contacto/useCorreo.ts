import { createComentario } from "@/services/Comentarios";
import { toast } from "sonner";

export function useCorreo() {

    const handleSubmitCorreo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const form = Object.fromEntries(data) as Record<string, string>;

        const { username, email, categoria, message: comentario, experiencia } = form;

        try {
            const { success, message } = await createComentario({ nombre: username, email, mensaje: comentario, ranking: parseInt(experiencia), servicio: categoria })

            if (!success) {
                toast.error(message);
            }

            toast.success(message || "Mensaje enviado exitosamente");
        } catch {
            toast.error("Error al enviar mensaje");
        }
    }

    return {
        handleSubmitCorreo
    }
}