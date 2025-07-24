import { usePreguntasContext } from "@/context/Preguntas";
import { createPregunta } from "@/services/Preguntas";
import { useState } from "react";
import { toast } from "sonner";


export function useCrearPregunta({ handleClickDesactivarModal }: { handleClickDesactivarModal: () => void }) {
    const { setPreguntas, ordenarPreguntas } = usePreguntasContext();
    const [preguntaForm, setPreguntaForm] = useState<{ pregunta: string; respuesta: string }>({
        pregunta: "",
        respuesta: "",
    });

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



    const handledescartarCambiosCrearPregunta = (handleClickDesactivarModal: () => void) => {
        if (preguntaForm.pregunta !== "" || preguntaForm.respuesta !== "") {
            toast("¿Estás seguro de querer cancelar los cambios?", {
                action: {
                    label: "Cerrar",
                    onClick: () => {
                        handleClickDesactivarModal();
                        setPreguntaForm({ pregunta: "", respuesta: "" });
                    }
                },
                cancel: {
                    label: "Cancelar",
                    onClick: () => {
                        toast.dismiss();
                    }
                }
            })
        } else {
            handleClickDesactivarModal();
            setPreguntaForm({ pregunta: "", respuesta: "" });
        }
    }


    return {
        preguntaForm,
        handleCrearPregunta,
        handleCambiarCampoPregunta,
        handledescartarCambiosCrearPregunta
    }

}