import type { ServicioProps } from "@/types/Servicios/types";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { INITIAL_SERVICIO_PROPS_WITH_ID } from "@/constants/Servicios";
import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";


function convertirADuracionEnMinutos(valor: string): number {
    const horasMatch = valor.match(/(\d+)\s*h/);
    const minutosMatch = valor.match(/(\d+)\s*m/);

    const horas = horasMatch ? parseInt(horasMatch[1], 10) : 0;
    const minutos = minutosMatch ? parseInt(minutosMatch[1], 10) : 0;

    const totalMinutos = horas * 60 + minutos;

    return totalMinutos; // Retorna número entero: 30, 60, 90, 120...
}


export function useModalEditarServicio() {

    const [formValues, setFormValues] = useState<ServicioProps>(INITIAL_SERVICIO_PROPS_WITH_ID);
    const formularioOriginal = useRef<ServicioProps>(INITIAL_SERVICIO_PROPS_WITH_ID);

    const handleEdit = (servicio: ServicioProps) => {
        setFormValues(servicio);
        formularioOriginal.current = servicio;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "duration") {
            setFormValues((prev) => ({ ...prev, [name]: convertirADuracionEnMinutos(value) }));
        } else {
            setFormValues((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handledescartarCambios = (handleClickDesactivarModal: () => void) => {
        const sonIguales = (Object.keys(formValues) as (keyof ServicioProps)[]).every((key) => {
            return formValues[key] === formularioOriginal.current[key];
        });

        if (sonIguales) {
            handleClickDesactivarModal();
        } else {
            mostrarToastConfirmacion({
                mensaje: "¿Estás seguro de deshacer los cambios?",
                textoAccion: "Deshacer",
                onConfirmar: () => {
                    handleClickDesactivarModal();
                },
                textoCancelar: "Cancelar",
                onCancelar: () => {
                    toast.dismiss();
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