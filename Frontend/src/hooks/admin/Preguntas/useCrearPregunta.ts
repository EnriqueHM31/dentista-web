import { usePreguntasContext } from "@/context/Preguntas";
import { createPregunta } from "@/services/Preguntas";
import { useState } from "react";
import { toast } from "sonner";
import type { CrearPreguntaProps, PreguntaFormProps } from "@/types/Preguntas/types";
import { INITIAL_PREGUNTA_FORM } from "@/constants/Preguntas";
import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";


export function useCrearPregunta({ handleClickDesactivarModal }: CrearPreguntaProps) {
    const { setPreguntas, ordenarPreguntas } = usePreguntasContext();
    const [preguntaForm, setPreguntaForm] = useState<PreguntaFormProps>(INITIAL_PREGUNTA_FORM);

    const handleCrearPregunta = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { pregunta: preguntaACrear, respuesta: respuestaACrear } = preguntaForm;
        const toastId = toast.loading("Creando pregunta...");
        try {
            const { success, message, preguntaCreada } = await createPregunta(preguntaACrear, respuestaACrear)
            if (!success) {
                toast.error(message, { id: toastId });
                return;
            }
            toast.success("Pregunta creada exitosamente", { id: toastId });
            setPreguntaForm({ pregunta: "", respuesta: "" });
            setPreguntas(prev => [...ordenarPreguntas([...prev, preguntaCreada])]);
            handleClickDesactivarModal();

        } catch {
            toast.error("Error al crear la pregunta", { id: toastId });
        }
    };

    const handleCambiarCampoPregunta = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPreguntaForm(prev => ({ ...prev, [name]: value }));
    };

    const handledescartarCambiosCrearPregunta = () => {
        if (preguntaForm.pregunta !== "" || preguntaForm.respuesta !== "") {
            mostrarToastConfirmacion({
                mensaje: "¿Estás seguro de querer cancelar los cambios?",
                textoAccion: "Cerrar",
                onConfirmar: () => {
                    handleClickDesactivarModal();
                    setPreguntaForm(INITIAL_PREGUNTA_FORM);
                },
            });
        } else {
            handleClickDesactivarModal();
            setPreguntaForm(INITIAL_PREGUNTA_FORM);
        }
    }


    return {
        preguntaForm,
        handleCrearPregunta,
        handleCambiarCampoPregunta,
        handledescartarCambiosCrearPregunta
    }

}