import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import { updateUsuario } from "@/services/Usuario";
import { toast } from "sonner";

export function useUpdateUsuario(cerrarMenu: () => void) {
    const handleMostrarConfirmacion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = (e.currentTarget.username as HTMLInputElement).value;
        const password = (e.currentTarget.password as HTMLInputElement).value;

        if (username === "" || password === "") {
            toast.error("Debes rellenar todos los campos");
            return;
        }

        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro de querer actualizar los datos?",
            textoAccion: "Aceptar",
            onConfirmar: async () => modificarUsuario(username, password),
        });

    };

    async function modificarUsuario(username: string, password: string) {
        try {
            const toastId = toast.loading("Cargando...");
            const { success, message } = await updateUsuario(username, password);;

            if (!success) {
                toast.error(message, { id: toastId });
                return;
            }
            toast.success("Datos actualizados correctamente", { id: toastId });
            cerrarMenu();
        } catch {
            toast.error("Error al actualizar los datos");
        }

    }

    return {
        handleMostrarConfirmacion
    }
}