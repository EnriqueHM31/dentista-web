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

        toast("¿Estás seguro de querer actualizar los datos?", {
            id: "confirmacion",
            action: {
                label: "Aceptar",
                onClick: async () => {
                    const toastId = toast.loading("Cargando...");
                    const { success, message } = await updateinfoUsuario(username, password);

                    if (!success) {
                        toast.error(message, { id: toastId });
                        return;
                    }
                    toast.success("Acción confirmada", { id: toastId });
                    cerrarMenu();
                },
            },
            cancel: {
                label: "Cancelar",
                onClick: () => {
                    toast.dismiss("confirmacion");
                },
            },
        });
    };


    const updateinfoUsuario = async (username: string, password: string) => {
        const { success, message } = await updateUsuario(username, password);

        return { success, message };
    }

    return {
        handleMostrarConfirmacion
    }
}