import { useContext, useEffect, useRef } from "react";
import { toast } from "sonner";
import type { ServicioResponse } from "@/types";
import { crearServicio, eliminarServicio } from "@/services/Servicios";
import { esURLValida } from "@/utils/constantes";
import { ServicioContext } from "@/context/Servicio";
import { convertirADuracionEnMinutos } from "@/utils/Hora";


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


    const handleEliminarServicio = async (id: `${string}-${string}-${string}-${string}-${string}` | "") => {

        if (id === "" || id === undefined) {
            toast.error("Servicio no encontrado");
            return;
        }
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
            const { success, message, servicio } = await crearServicio({ titulo, descripcion, img, duration: convertirADuracionEnMinutos(duration) });

            if (success) {
                toast.success("Servicio creado correctamente");
                handleClickDesactivarModal();
                setServicios(prev => [...prev, servicio]);
            } else {
                toast.error(message || "Error al crear el servicio");
            }
        } catch {
            toast.error("Error de red al crear el servicio");
        }

    }



    return { servicios, serviciosRef: formRef, handleEliminarServicio, handleSubmitCrearServicio };
}
