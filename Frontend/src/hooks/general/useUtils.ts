import type { useCopyTextProps } from "@/types/Components/types";
import { toast } from "sonner";

export const useUtils = () => {
    const handleClickCopy = async ({ text, mensaje }: useCopyTextProps) => {
        if (!navigator.clipboard) throw new Error("No se puede copiar el texto");

        try {
            await navigator.clipboard.writeText(text);
            toast.success(mensaje || "Texto copiado al portapapeles");
        } catch (error) {
            const message = error || "Error al copiar el texto";
            toast.error(message.toString());
        }
    };

    return {
        handleClickCopy,
    };
};
