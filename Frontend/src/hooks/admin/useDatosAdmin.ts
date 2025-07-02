import { toast } from "sonner";

export function useDatosAdmin() {
    const handleMostrarConfirmacion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast("¿Estás seguro?", {
            id: "confirmacion",
            description: "Esta acción no se puede deshacer.",
            action: {
                label: "Aceptar",
                onClick: () => {
                    toast.success("Acción confirmada");
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

    return {
        handleMostrarConfirmacion
    }
}