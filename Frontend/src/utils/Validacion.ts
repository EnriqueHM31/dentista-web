import { toast } from "sonner";

export function validarCamposLlenos(obj: Record<string, unknown>): boolean {
    for (const [key, value] of Object.entries(obj)) {
        const isEmpty =
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === "") ||
            (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
            toast.error(`El campo ${key} es obligatorio.`);
            return false;
        }
    }

    return true;
}

export const esURLValida = (url: unknown): boolean => {
    if (typeof url !== "string" || url.trim() === "") return false;

    try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
};