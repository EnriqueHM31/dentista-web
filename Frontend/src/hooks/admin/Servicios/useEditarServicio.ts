import { toast } from "sonner";
import type { ServicioResponse, Servicio } from "@/types";
import { useState } from "react";
import { modificarServicio } from "@/services/Servicios";

interface useEditarServicioProps {
    serviciosRef: React.RefObject<ServicioResponse[]>,
    formValues: ServicioResponse,
    handleClickDesactivarModal: () => void
}

export function useEditarServicio({ serviciosRef, formValues, handleClickDesactivarModal }: useEditarServicioProps) {
    const [preview, setPreview] = useState<keyof Servicio | null>('name');


    const handlePreview = (campo: keyof Servicio) => {
        setPreview(campo);
    };


    const handleSubmit = async (e: React.FormEvent, id: string, refresh: (id: string, data: Partial<ServicioResponse>) => void) => {
        e.preventDefault();

        // Verificar si hubo cambios

        const cambios = (Object.keys(formValues) as (keyof Servicio)[]).filter(
            (key) => formValues[key] !== serviciosRef.current.find((s) => s.id === id)?.[key]
        );

        if (cambios.length === 0) {
            toast.info("No hay cambios para guardar.");
            return;
        }

        // Si hay cambios, confirmar
        toast("¿Estás seguro que quieres guardar los cambios?", {
            action: {
                label: "Guardar",
                onClick: async () => {
                    try {
                        const data = cambios.reduce((acc, key) => {
                            acc[key] = formValues[key] as `${string}-${string}-${string}-${string}-${string}`;
                            return acc;
                        }, {} as Partial<ServicioResponse>);



                        const { success, message } = await modificarServicio(id, data)

                        if (success) {
                            toast.success("Cambios guardados correctamente");
                            handleClickDesactivarModal();
                            refresh(id, formValues);
                        } else {
                            toast.error(message || "Error al guardar los cambios.");
                        }
                    } catch (error) {
                        toast.error("Error de red al guardar los cambios.");
                        console.error(error);
                    }
                },
            },
            cancel: {
                label: "Cancelar",
                onClick: () => {
                    toast.dismiss();
                },
            },
        });
    };

    return {
        preview,
        handlePreview,
        handleSubmit,
    }
}