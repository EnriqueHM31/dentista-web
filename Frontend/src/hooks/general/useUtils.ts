import { toast } from "sonner";

export const useUtils = () => {
    const handleClickCopy = (text: string, mensaje: string) => {
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