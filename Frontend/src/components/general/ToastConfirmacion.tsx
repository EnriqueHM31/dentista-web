import { toast } from "sonner";
import type { ToastConfirmacionOptions } from "@/types/Components/types";

export function mostrarToastConfirmacion({
    mensaje,
    textoAccion,
    onConfirmar,
    textoCancelar = "Cancelar",
    onCancelar = () => toast.dismiss(),
}: ToastConfirmacionOptions) {
    toast(mensaje, {
        action: {
            label: textoAccion,
            onClick: onConfirmar,
        },
        cancel: {
            label: textoCancelar,
            onClick: onCancelar,
        },
    });
}
