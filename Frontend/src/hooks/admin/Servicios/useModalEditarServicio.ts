import type { ServicioResponse } from "@/types";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function useModalEditarServicio() {

    function convertirADuracionEnMinutos(valor: string): number {
        const horasMatch = valor.match(/(\d+)\s*h/);
        const minutosMatch = valor.match(/(\d+)\s*m/);

        const horas = horasMatch ? parseInt(horasMatch[1], 10) : 0;
        const minutos = minutosMatch ? parseInt(minutosMatch[1], 10) : 0;

        const totalMinutos = horas * 60 + minutos;

        return totalMinutos; // Retorna número entero: 30, 60, 90, 120...
    }



    const [formValues, setFormValues] = useState<ServicioResponse>({ id: "", name: "", description: "", img: "", duration: 0 });
    const formularioOriginal = useRef<ServicioResponse>({ id: "", name: "", description: "", img: "", duration: 0 });

    const handleEdit = (servicio: ServicioResponse) => {
        setFormValues(servicio);
        formularioOriginal.current = servicio;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value);

        if (name === "duration") {
            setFormValues((prev) => ({ ...prev, [name]: convertirADuracionEnMinutos(value) }));
        } else {
            setFormValues((prev) => ({ ...prev, [name]: value }));
        }
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