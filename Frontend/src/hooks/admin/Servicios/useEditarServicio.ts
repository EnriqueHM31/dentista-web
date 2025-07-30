import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import { KEY_SERVICIOS } from "@/constants/Servicios";
import { useServicioContext } from "@/context/Servicio";
import { modificarServicio } from "@/services/Servicios";
import type { ServicioCrearProps, ServicioProps, useEditarServicioProps } from "@/types/Servicios/types";
import type { UUID } from "@/types/types";
import { verificarCambiosServicio } from "@/utils/Cambios";
import { useState } from "react";
import { toast } from "sonner";

export function useEditarServicio({ serviciosRef, formValues, handleClickDesactivarModal }: useEditarServicioProps) {
    const [preview, setPreview] = useState<keyof ServicioProps | null>(KEY_SERVICIOS.titulo);
    const { refrescarServiciosEditar } = useServicioContext();

    const handlePreview = (campo: keyof ServicioProps) => {
        setPreview(campo);
    };


    const handleSubmit = async (e: React.FormEvent, id: UUID) => {
        e.preventDefault();

        const cambios = verificarCambiosServicio({ serviciosRef, formValues, id });

        if (cambios.length === 0) {
            toast.info("No hay cambios para guardar.");
            return;
        }

        // Si hay cambios, confirmar
        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro que quieres guardar los cambios?",
            textoAccion: "Guardar",
            onConfirmar: async () => editarServicio({ cambios, id }),
            textoCancelar: "Cancelar",
            onCancelar: () => toast.dismiss("Cancelando cambios"),
        });

    };

    async function editarServicio({ cambios, id }: { cambios: (keyof ServicioProps)[], id: UUID }) {
        try {
            const data = Object.fromEntries(
                (cambios as (keyof ServicioCrearProps)[])
                    .map((key) => [key, formValues[key]])
                    .filter(([, value]) => value !== undefined)
            ) as Partial<ServicioCrearProps>;


            const { success, message, servicio } = await modificarServicio({ id, data });

            if (success) {
                toast.success("Cambios guardados correctamente");
                handleClickDesactivarModal();
                refrescarServiciosEditar(servicio, servicio.id);
            } else {
                toast.error(message || "Error al guardar los cambios.");
            }

        } catch {
            toast.error("Error de red al guardar los cambios.");
        }
    }

    return {
        preview,
        handlePreview,
        handleSubmit,
    }
}