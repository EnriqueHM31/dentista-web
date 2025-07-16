import { createPregunta } from "@/services/Preguntas";
import { useState } from "react";
import { toast } from "sonner";

interface PreguntaResponse {
    success: boolean;
    message: string;
    pregunta: {
        id: string;
        pregunta: string;
        respuesta: string;
    }
}

export function useCrearPregunta() {
    const [preguntaForm, setPreguntaForm] = useState<{ pregunta: string; respuesta: string }>({
        pregunta: "",
        respuesta: "",
    });


    const handleCrearPregunta = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { pregunta: preguntaACrear, respuesta: respuestaACrear } = preguntaForm;
        const toastId = toast.loading("Creando pregunta...");
        try {
            const { success, message, } = await createPregunta(preguntaACrear, respuestaACrear) as PreguntaResponse;
            if (!success) {
                toast.error(message, { id: toastId });
                return;
            }
            toast.success("Pregunta creada exitosamente", { id: toastId });
            setPreguntaForm({ pregunta: "", respuesta: "" });
        } catch {
            toast.error("Error al crear la pregunta", { id: toastId });
        }
    };

    const handleCambiarPregunta = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreguntaForm(prev => ({ ...prev, pregunta: e.target.value }));
    }

    const handleCambiarRespuesta = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPreguntaForm(prev => ({ ...prev, respuesta: e.target.value }));
    }

    return {
        preguntaForm,
        handleCrearPregunta,
        handleCambiarPregunta,
        handleCambiarRespuesta
    }

}