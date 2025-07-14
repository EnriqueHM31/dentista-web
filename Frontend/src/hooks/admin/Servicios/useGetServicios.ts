import { useContext, useEffect, useRef } from "react";
import { toast } from "sonner";
import type { ServicioResponse } from "@/types";
import { crearServicio, eliminarServicio } from "@/services/Servicios";
import { esURLValida } from "@/assets/ts/constantes";
import { ServicioContext } from "@/context/Servicio";


interface useGetServiciosProps {
    handleClickDesactivarModal: () => void
}

export function useGetServicios({ handleClickDesactivarModal }: useGetServiciosProps) {
    const { servicios, setServicios } = useContext(ServicioContext);
    const formRef = useRef<ServicioResponse[]>([]);


    useEffect(() => {
        if (servicios.length !== 0) {
            formRef.current = servicios;
        }
    }, [servicios]);

    const refrescarUpdateServicio = (
        id: string,
        {
            name,
            description,
            img,
            duration,
        }: {
            name?: string;
            description?: string;
            img?: string;
            duration?: number;
        }
    ) => {
        const index = formRef.current.findIndex((s) => s.id === id);
        if (index === -1) {
            toast.error("Servicio no encontrado");
            return;
        }

        const cambios: Partial<ServicioResponse> = {};
        if (name !== undefined) cambios.name = name;
        if (description !== undefined) cambios.description = description;
        if (img !== undefined) cambios.img = img;
        if (duration !== undefined) cambios.duration = duration;

        formRef.current[index] = {
            ...formRef.current[index],
            ...cambios,
        };

        setServicios([...formRef.current]);
    };





    const refrescarCrearServicio = ({ id, name, description, img, duration }: ServicioResponse) => {

        setServicios(prev => [...prev, { id, name, description, img, duration }].sort((a, b) => a.name.localeCompare(b.name)));
    }

    const handleEliminarServicio = async (id: `${string}-${string}-${string}-${string}-${string}` | "") => {

        toast("¿Estas seguro que quieres eliminar este servicio?", {
            action: {
                label: "Eliminar",
                onClick: async () => {
                    const index = servicios.findIndex((s) => s.id === id);
                    if (index === -1) {
                        toast.error("Servicio no encontrado");
                        return;
                    }

                    const { success, message } = await eliminarServicio(id);
                    if (success) {
                        toast.success("Servicio eliminado correctamente");
                        formRef.current.splice(index, 1);
                        setServicios([...formRef.current]);
                    } else {
                        toast.error(message || "Error al eliminar el servicio");
                    }
                }
            },
            cancel: {
                label: "Cancelar",
                onClick: () => {
                    toast.dismiss();
                }
            }

        }
        );
    };

    const handleSubmitCrearServicio = async (e: React.FormEvent,) => {

        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);
        const { titulo, descripcion, img, duration } = Object.fromEntries(data.entries()) as { titulo: string, descripcion: string, img: string, duration: string };

        if (!titulo || !descripcion || !img || !duration) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (!esURLValida(img.toString())) {
            toast.error("La imagen no es válida");
            return;
        }

        try {
            const { success, message, servicio } = await crearServicio({ titulo, descripcion, img, duration });

            if (success) {
                toast.success("Servicio creado correctamente");
                handleClickDesactivarModal();
                refrescarCrearServicio(servicio);
            } else {
                toast.error(message || "Error al crear el servicio");
            }
        } catch (error) {
            toast.error("Error de red al crear el servicio");
            console.error(error);
        }

    }



    return { servicios, serviciosRef: formRef, refrescarUpdateServicio, refrescarCrearServicio, handleEliminarServicio, handleSubmitCrearServicio };
}
