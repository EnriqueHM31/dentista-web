import type { EspecialistaProps, FormCrearEspecialistaProps } from "@/types/Especialistas/types";
import type { PreguntaProps } from "@/types/Preguntas/types";
import type { ServicioProps } from "@/types/Servicios/types";
import type { SocialProps } from "@/types/Sociales/types";
import type { UUID } from "@/types/types";

export function ExistenCambiosEspecialista({ especialistaSeleccionado, especialistaRef }: { especialistaSeleccionado: EspecialistaProps | null, especialistaRef: React.RefObject<FormCrearEspecialistaProps> }) {
    const camposCambiados: Partial<FormCrearEspecialistaProps> = {};
    (Object.keys(especialistaRef.current) as (keyof FormCrearEspecialistaProps)[]).forEach((key) => {
        if (especialistaRef.current[key] !== especialistaSeleccionado?.[key]) {
            camposCambiados[key] = especialistaSeleccionado?.[key];
        }
    });

    return camposCambiados
}

export function sonPreguntasIguales(a: PreguntaProps | null, b: PreguntaProps | null): boolean {
    if (!a || !b) return false;
    return a.id === b.id && a.pregunta === b.pregunta && a.respuesta === b.respuesta;
}



export function verificarCambiosServicio({ serviciosRef, formValues, id }: { serviciosRef: React.MutableRefObject<ServicioProps[]>, formValues: Partial<ServicioProps>, id: UUID }) {
    return (Object.keys(formValues) as (keyof ServicioProps)[]).filter((key) => {
        if (key === "id") return false;

        const nuevoValor = formValues[key];
        const original = serviciosRef.current.find((s) => s.id === id)?.[key];

        return nuevoValor !== original;
    });
}


export function ExistenModificacionesSociales({ SocialEdit, originalSocialRef }: { SocialEdit: SocialProps[], originalSocialRef: React.RefObject<SocialProps[]> }) {
    return SocialEdit.filter((item) => {
        const original = originalSocialRef.current.find((o) => o.id === item.id);
        return original && original.referencia !== item.referencia;
    });
}