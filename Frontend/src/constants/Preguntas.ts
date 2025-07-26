import type { PreguntaFormProps, PreguntaProps } from "@/types/Preguntas/types";

export const INITIAL_PREGUNTA_FORM: PreguntaFormProps = {
    pregunta: "",
    respuesta: "",
}

export function sonPreguntasIguales(a: PreguntaProps | null, b: PreguntaProps | null): boolean {
    if (!a || !b) return false;
    return a.id === b.id && a.pregunta === b.pregunta && a.respuesta === b.respuesta;
}
