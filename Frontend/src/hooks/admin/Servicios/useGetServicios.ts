import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { crearServicio, deleteServicio } from "@/services/Servicios";
import { esURLValida, MINUTOS_ARRAY } from "@/utils/constantes";
import { useServicioContext } from "@/context/Servicio";
import { convertirADuracionEnMinutos } from "@/utils/Hora";
import type { ServicioCrearProps, ServicioProps, useGetServiciosProps } from "@/types/Servicios/types";
import { INITIAL_SERVICIO_PROPS } from "@/constants/Servicios";
import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import type { UUID } from "@/types/types";


export function useGetServicios({ handleClickDesactivarModal }: useGetServiciosProps) {
    const { servicios, refrescarServiciosEliminar, refrescarServiciosCrear } = useServicioContext();
    const [servicioCrear, setServicioCrear] = useState<ServicioCrearProps>(INITIAL_SERVICIO_PROPS);
    const formRef = useRef<ServicioProps[]>([]);


    useEffect(() => {
        if (servicios.length !== 0) {
            formRef.current = servicios;
        }
    }, [servicios]);


    useEffect(() => {
        setServicioCrear((prev) => ({
            ...prev,
            duration: Number(MINUTOS_ARRAY[0]),
        }));
    }, [servicioCrear.duration]);


    const handleEliminarServicio = async (id: UUID) => {
        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro que quieres eliminar este servicio?",
            textoAccion: "Eliminar",
            onConfirmar: async () => eliminaServicio({ id }),
            textoCancelar: "Cancelar",
            onCancelar: () => toast.dismiss("Cancelando eliminación"),
        });

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
            mostrarToastConfirmacion({
                mensaje: "¿Estás seguro de querer cancelar los cambios?",
                textoAccion: "Cerrar",
                onConfirmar: () => {
                    handleClickDesactivarModal();
                    setServicioCrear(INITIAL_SERVICIO_PROPS);
                },
                textoCancelar: "Cancelar",
                onCancelar: () => {
                    toast.dismiss("Cancelando cambios");
                },
            });
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

        const NewServicio: ServicioCrearProps = {
            titulo,
            descripcion,
            img,
            duration: duration.toString().includes("h") ? convertirADuracionEnMinutos(duration.toString()) : duration
        }

        try {
            const { success, message, servicio } = await crearServicio(NewServicio);

            if (success) {
                refrescarServiciosCrear(servicio);
                toast.success(message || "Servicio creado correctamente");
                handleClickDesactivarModal();
            } else {
                toast.error(message || "Error al crear el servicio");
            }
        } catch {
            toast.error("Error de red al crear el servicio");
        }
    }

    async function eliminaServicio({ id }: { id: UUID }) {
        try {
            const index = servicios.findIndex((s) => s.id === id);
            if (index === -1) {
                toast.error("Servicio no encontrado");
                return;
            }

            const { success, message, servicio } = await deleteServicio(id);

            if (success) {
                toast.success("Servicio eliminado correctamente");
                refrescarServiciosEliminar(servicio.id);
            } else {
                toast.error(message || "Error al eliminar el servicio");
            }
        } catch {
            toast.error("Error de red al eliminar el servicio");
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
