import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { ServicioResponse } from "@/types";
import { crearServicio, eliminarServicio } from "@/services/Servicios";
import { esURLValida, MINUTOS_ARRAY } from "@/utils/constantes";
import { useServicioContext } from "@/context/Servicio";
import { convertirADuracionEnMinutos, formatoHoraMinuto } from "@/utils/Hora";

interface ServicioCrearProps {
    titulo: string,
    descripcion: string,
    img: string,
    duration: string
}

const INITIAL_SERVICIO_PROPS: ServicioCrearProps = {
    titulo: "",
    descripcion: "",
    img: "",
    duration: "" as string
}

interface useGetServiciosProps {
    handleClickDesactivarModal: () => void
}

export function useGetServicios({ handleClickDesactivarModal }: useGetServiciosProps) {
    const { servicios, setServicios } = useServicioContext();
    const [servicioCrear, setServicioCrear] = useState<ServicioCrearProps>(INITIAL_SERVICIO_PROPS);
    const formRef = useRef<ServicioResponse[]>([]);


    useEffect(() => {
        if (servicios.length !== 0) {
            formRef.current = servicios;
        }
    }, [servicios]);


    useEffect(() => {
        const opciones = formatoHoraMinuto(MINUTOS_ARRAY);
        if (!servicioCrear.duration && opciones.length > 0) {
            setServicioCrear((prev) => ({
                ...prev,
                duration: opciones[0],
            }));
        }
    }, [servicioCrear.duration]);


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

    const handleCambiarCampoServicio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setServicioCrear(prev => ({ ...prev, [name]: value } as ServicioCrearProps));
    }

    const handledescartarCambiosCrearServicio = (handleClickDesactivarModal: () => void) => {
        if (Object.entries(servicioCrear)
            .filter(([key]) => key !== "duration") // 👈 Filtra la clave que no quieres evaluar
            .every(([, value]) => value === "")
        ) {
            handleClickDesactivarModal();
        } else {
            toast("¿Estás seguro de querer cancelar los cambios?", {
                action: {
                    label: "Cerrar",
                    onClick: () => {
                        handleClickDesactivarModal();
                        setServicioCrear(INITIAL_SERVICIO_PROPS);
                    }
                },
                cancel: {
                    label: "Cancelar",
                    onClick: () => {
                        toast.dismiss();
                    }
                }
            })
        }
    }


    const handleSubmitCrearServicio = async (e: React.FormEvent,) => {

        e.preventDefault();

        const { titulo, descripcion, img, duration } = servicioCrear;

        if (!titulo || !descripcion || !img || !duration) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (!esURLValida(img.toString())) {
            toast.error("La imagen no es válida");
            return;
        }

        try {
            const { success, message, servicio } = await crearServicio({ titulo, descripcion, img, duration: convertirADuracionEnMinutos(duration.toString()) });

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



    return {
        servicios,
        serviciosRef: formRef,
        servicioCrear,
        handleCambiarCampoServicio,
        handledescartarCambiosCrearServicio,
        handleEliminarServicio,
        handleSubmitCrearServicio
    };
}
