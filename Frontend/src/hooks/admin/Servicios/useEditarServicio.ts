import { toast } from "sonner";
import type { ServicioProps, ServicioCrearProps, useEditarServicioProps } from "@/types/Servicios/types";
import { useState } from "react";
import { modificarServicio } from "@/services/Servicios";
import { useServicioContext } from "@/context/Servicio";
import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";



export function useEditarServicio({ serviciosRef, formValues, handleClickDesactivarModal }: useEditarServicioProps) {
    const [preview, setPreview] = useState<keyof ServicioProps | null>('titulo');
    const { setServicios } = useServicioContext();

    const handlePreview = (campo: keyof ServicioProps) => {
        setPreview(campo);
    };


    const handleSubmit = async (e: React.FormEvent, id: string) => {
        e.preventDefault();

        // Verificar si hubo cambios

        const cambios = (Object.keys(formValues) as (keyof ServicioProps)[]).filter((key) => {
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
        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro que quieres guardar los cambios?",
            textoAccion: "Guardar",
            onConfirmar: async () => {
                try {
                    const data = Object.fromEntries(
                        (cambios as (keyof ServicioCrearProps)[])
                            .map((key) => [key, formValues[key]])
                            .filter(([, value]) => value !== undefined)
                    ) as Partial<ServicioCrearProps>;

                    const { titulo, descripcion, img, duration } = data;

                    const { success, message } = await modificarServicio(
                        id as `${string}-${string}-${string}-${string}-${string}`,
                        { titulo, descripcion, img, duration }
                    );

                    if (success) {
                        toast.success("Cambios guardados correctamente");
                        handleClickDesactivarModal();
                        setServicios(prev =>
                            prev.map(s => s.id === id ? { ...s, ...formValues } : s)
                        );
                    } else {
                        toast.error(message || "Error al guardar los cambios.");
                    }

                } catch {
                    toast.error("Error de red al guardar los cambios.");
                }
            },
        });

    };

    return {
        preview,
        handlePreview,
        handleSubmit,
    }
}