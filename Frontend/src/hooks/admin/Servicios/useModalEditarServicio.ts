import type { ServicioResponse } from "@/types";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function useModalEditarServicio() {
    const [formValues, setFormValues] = useState<ServicioResponse>({ id: "", name: "", description: "", img: "" });
    const formularioOriginal = useRef<ServicioResponse>({ id: "", name: "", description: "", img: "" });

    const handleEdit = (servicio: ServicioResponse) => {
        setFormValues(servicio);
        formularioOriginal.current = servicio;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handledescartarCambios = (handleClickDesactivarModal: () => void) => {
        const sonIguales = (Object.keys(formValues) as (keyof ServicioResponse)[]).every((key) => {
            return formValues[key] === formularioOriginal.current[key];
        });

        if (sonIguales) {
            handleClickDesactivarModal();
        } else {
            toast("Estas seguro de deshacer los cambios?", {
                action: {
                    label: "Deshacer",
                    onClick: () => {
                        handleClickDesactivarModal();
                    }
                },
                cancel: {
                    label: "Cancelar",
                    onClick: () => {
                        toast.dismiss();
                    }
                },
            });
        }
    };

    return {
        formValues,
        handleEdit,
        handleChange,
        handledescartarCambios,
        formularioOriginal
    }


}