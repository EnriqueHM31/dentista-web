import type { ToastConfirmacionOptions } from "@/types/Components/types";
import { toast } from "sonner";

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
