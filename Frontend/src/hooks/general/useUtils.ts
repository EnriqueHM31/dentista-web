import { toast } from "sonner";
import type { useCopyTextProps } from "@/types/Components/types";

export const useUtils = () => {
    const handleClickCopy = async ({ text, mensaje }: useCopyTextProps) => {
        if (!navigator.clipboard) {
            toast.error("Tu navegador no permite copiar al portapapeles.");
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            toast.success(mensaje || "Texto copiado al portapapeles");
        } catch (error) {
            toast.error("Error al copiar el texto");
            console.error("Clipboard error:", error);
        }
    };

    return {
        handleClickCopy,
    };
};
