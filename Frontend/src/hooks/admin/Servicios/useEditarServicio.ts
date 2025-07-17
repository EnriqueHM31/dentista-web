import { toast } from "sonner";
import type { ServicioResponse, Servicio } from "@/types";
import { useContext, useState } from "react";
import { modificarServicio } from "@/services/Servicios";
import { ServicioContext } from "@/context/Servicio";

interface useEditarServicioProps {
    serviciosRef: React.RefObject<ServicioResponse[]>,
    formValues: ServicioResponse,
    handleClickDesactivarModal: () => void
}

export function useEditarServicio({ serviciosRef, formValues, handleClickDesactivarModal }: useEditarServicioProps) {
    const [preview, setPreview] = useState<keyof Servicio | null>('titulo');
    const { setServicios } = useContext(ServicioContext);

    const handlePreview = (campo: keyof Servicio) => {
        setPreview(campo);
    };


    const handleSubmit = async (e: React.FormEvent, id: string) => {
        e.preventDefault();

        // Verificar si hubo cambios

        const cambios = (Object.keys(formValues) as (keyof Servicio)[]).filter((key) => {
            if (key === "id") return false;

            const nuevoValor = formValues[key];
            const original = serviciosRef.current.find((s) => s.id === id)?.[key];

            return nuevoValor !== original;
        });



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

                        const data = Object.fromEntries(
                            (cambios as (keyof ServicioResponse)[])
                                .map((key) => [key, formValues[key]])
                                .filter(([, value]) => value !== undefined)
                        ) as Partial<ServicioResponse>;

                        const { titulo, descripcion, img, duration } = data;

                        const { success, message } = await modificarServicio(
                            id,
                            { titulo, descripcion, img, duration }
                        );


                        if (success) {
                            toast.success("Cambios guardados correctamente");
                            handleClickDesactivarModal();
                            setServicios(prev => prev.map(s => s.id === id ? { ...s, ...formValues } : s));
                        } else {
                            toast.error(message || "Error al guardar los cambios.");
                        }
                    } catch {
                        toast.error("Error de red al guardar los cambios.");
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