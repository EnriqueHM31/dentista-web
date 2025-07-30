import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import { INITIAL_SERVICIO_PROPS_WITH_ID, KEY_SERVICIOS } from "@/constants/Servicios";
import type { ServicioProps } from "@/types/Servicios/types";
import { convertirADuracionEnMinutos } from "@/utils/Hora";
import { useRef, useState } from "react";
import { toast } from "sonner";


export function useModalEditarServicio() {

    const [formValues, setFormValues] = useState<Partial<ServicioProps>>(INITIAL_SERVICIO_PROPS_WITH_ID);
    const formularioOriginal = useRef<ServicioProps>(INITIAL_SERVICIO_PROPS_WITH_ID);

    const handleEdit = (servicio: ServicioProps) => {
        setFormValues(servicio);
        formularioOriginal.current = servicio;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === KEY_SERVICIOS.duration) {
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