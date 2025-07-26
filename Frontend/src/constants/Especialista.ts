import type { EspecialistaProps, FormCrearEspecialistaProps } from "@/types/Especialistas/types";

export function ExistenCambiosEspecialista({ especialistaSeleccionado, especialistaRef }: { especialistaSeleccionado: EspecialistaProps | null, especialistaRef: React.RefObject<FormCrearEspecialistaProps> }) {
    const camposCambiados: Partial<FormCrearEspecialistaProps> = {};
    (Object.keys(especialistaRef.current) as (keyof FormCrearEspecialistaProps)[]).forEach((key) => {
        if (especialistaRef.current[key] !== especialistaSeleccionado?.[key]) {
            camposCambiados[key] = especialistaSeleccionado?.[key];
        }
    });

    return camposCambiados
}