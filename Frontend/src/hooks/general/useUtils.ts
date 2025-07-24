import { toast } from "sonner";
import type { useCopyTextProps } from "@/types/Components/types";

export const useUtils = () => {
    const handleClickCopy = ({ text, mensaje }: useCopyTextProps) => {
        if (!navigator.clipboard) {
            toast.error('No se pudo copiar el texto');
            return;
        }
        navigator.clipboard.writeText(text);
        toast.success(mensaje);
    };

    return {
        handleClickCopy
    }
}