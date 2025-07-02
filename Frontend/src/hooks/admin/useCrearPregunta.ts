import { useState } from "react";
import { toast } from "sonner";

export function useCrearPregunta() {
    const [preguntaForm, setPreguntaForm] = useState<{ pregunta: string; respuesta: string }>({
        pregunta: "",
        respuesta: "",
    });

    const handleCrearPregunta = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { pregunta, respuesta } = preguntaForm;
        const toastId = toast.loading("Creando pregunta...");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/preguntas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pregunta, respuesta }),
            });

            if (res.ok) {
                toast.success("Pregunta creada exitosamente", { id: toastId });
                setPreguntaForm({ pregunta: "", respuesta: "" });
            } else {
                throw new Error();
            }
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