import { useEspecialistasContext } from "@/context/Especialistas";
import { useServicioContext } from "@/context/Servicio";
import { createEspecialista, deleteEspecialista, updateEspecialista } from "@/services/Especialistas";
import type { EspecialistaProps } from "@/types/Especialistas/types";
import { esURLValida } from "@/utils/constantes";
import { useRef, useState } from "react";
import { toast } from "sonner";


interface PropsHookEspecialistas {
    especialistas: EspecialistaProps[];
    toggle: (id: string) => void;
    handleClickDesactivarModal: () => void;
}

const INITIAL_ESPECIALISTA: Omit<EspecialistaProps, "id"> = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    linkedin: "",
    avatar: "",
    servicio: "",
}

const INITIAL_ESPECIALISTA_CREAR: Omit<EspecialistaProps, "id" | "servicio"> = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    linkedin: "",
    avatar: "",
}

export function useEspecialistas({ toggle, handleClickDesactivarModal }: PropsHookEspecialistas) {
    const { setEspecialistas, ordenarEspecialistas } = useEspecialistasContext();
    const { serviciosDisponibles, setServiciosDisponibles, servicios } = useServicioContext();
    const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState<EspecialistaProps | null>(null);
    const [especialistaCrear, setEspecialistaCrear] = useState<Omit<EspecialistaProps, "id">>(INITIAL_ESPECIALISTA);
    const especialistaRef = useRef<Omit<EspecialistaProps, "id">>(INITIAL_ESPECIALISTA);



    const handleOpen = (especialista?: EspecialistaProps, modal?: string) => {
        setEspecialistaSeleccionado(especialista || null);
        especialistaRef.current = especialista || INITIAL_ESPECIALISTA;
        toggle(modal || ""); // abre el modal
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEspecialistaSeleccionado((prev) =>
            prev ? { ...prev, [name]: value } : null
        );
    };

    const handleEditarEspecialista = async (e: React.FormEvent, id: `${string}-${string}-${string}-${string}-${string}`) => {
        e.preventDefault();

        const camposCambiados: Partial<Omit<EspecialistaProps, "id">> = {};

        // Detectar qué campos cambiaron
        (Object.keys(especialistaRef.current) as (keyof Omit<EspecialistaProps, "id">)[]).forEach((key) => {
            if (especialistaRef.current[key] !== especialistaSeleccionado?.[key]) {
                camposCambiados[key] = especialistaSeleccionado?.[key];
            }
        });

        if (Object.keys(camposCambiados).length === 0) {
            toast.info("No hay cambios para guardar.");
            return;
        }

        try {
            const { success, message, cambios } = await updateEspecialista(id, camposCambiados);

            if (success) {
                toast.success(message);
                setEspecialistas(prev => ordenarEspecialistas(prev.map(esp => esp.id === id ? { ...esp, ...cambios } : esp)));
                handleClickDesactivarModal();
            } else {
                toast.error(message);
            }
        } catch {
            toast.error("Error al actualizar el especialista.");
        }


    };

    const handleDescartarCambiosEditarEspecialista = () => {

        const sonIguales = Object.keys(especialistaRef.current).every(key => especialistaRef.current[key as keyof Omit<EspecialistaProps, "id">] === especialistaSeleccionado?.[key as keyof Omit<EspecialistaProps, "id">]);

        if (sonIguales) {
            handleClickDesactivarModal();
        } else {
            toast("¿Estas seguro de descartar los cambios?", {
                action: {
                    label: "Descartar",
                    onClick: () => {
                        handleClickDesactivarModal();
                    },
                },
                cancel: {
                    label: "Cancelar",
                    onClick: () => {
                        toast.dismiss();
                    },
                },
            });
        }
    }

    const handleDelete = async (especialista: EspecialistaProps) => {
        toast("Estas seguro de eliminar este especialista", {
            action: {
                label: "Eliminar",
                onClick: async () => {

                    const { success, message } = await deleteEspecialista(especialista.id as `${string}-${string}-${string}-${string}-${string}`);


                    if (success) {
                        toast.success(message);
                        setEspecialistas(prev => prev.filter((esp) => esp.id !== especialista.id));
                        const servicioEliminado = servicios.find(servicio => servicio.titulo === especialista.servicio);
                        if (servicioEliminado) {
                            setServiciosDisponibles(prev => [...prev, servicioEliminado]);
                        }
                    } else {
                        toast.error(message);
                    }
                },
            },

            cancel: {
                label: "Cancelar",
                onClick: () => {
                    toast.dismiss();
                },
            },
        })
    };


    const handleChangeCrearEspecialista = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEspecialistaCrear((prev) => ({ ...prev, [name]: value }));
    };

    const handleCrearEspecialista = async (e: React.FormEvent) => {
        e.preventDefault();
        const { avatar, linkedin, servicio } = especialistaCrear;

        const servicioDisponible = serviciosDisponibles.find((servicioObtener) => servicioObtener.titulo === servicio);

        if (!servicioDisponible) {
            return { success: false, message: "El servicio no está disponible", especialistaCreado: null };
        }

        if (!esURLValida(avatar)) {
            return { success: false, message: "La URL de la imagen no es válida", especialistaCreado: null };
        }

        if (!esURLValida(linkedin)) {
            return { success: false, message: "La URL de linkedIn no es válida", especialistaCreado: null };
        }

        const newEspecialista = { ...especialistaCrear, servicio: servicioDisponible.id };

        try {


            const { success, message, especialista: especialistaCreado } = await createEspecialista(newEspecialista);

            if (success) {
                toast.success(message);
                setEspecialistas(prev =>
                    ordenarEspecialistas([...prev, especialistaCreado])
                );
                setServiciosDisponibles(serviciosDisponibles.filter(servicio => servicio.id !== servicioDisponible.id));
                handleClickDesactivarModal();
            } else {
                toast.error(message);
            }

        } catch {
            toast.error("Error al crear el especialista.");
        }
    };

    const handleDescartarCambiosCrearEspecialista = () => {

        const clavesAComparar = Object.keys(especialistaCrear).filter(
            key => key !== "id" && key !== "servicio"
        ) as (keyof Omit<EspecialistaProps, "id" | "servicio">)[];

        const sonIguales = clavesAComparar.every(
            key => especialistaCrear[key] === INITIAL_ESPECIALISTA_CREAR[key]
        );

        if (sonIguales)
            handleClickDesactivarModal();
        else {
            toast("¿Estas seguro de descartar los cambios?", {
                action: {
                    label: "Descartar",
                    onClick: () => {
                        handleClickDesactivarModal();
                        setEspecialistaCrear(INITIAL_ESPECIALISTA);
                    },
                },
                cancel: {
                    label: "Cancelar",
                    onClick: () => {
                        toast.dismiss();
                    },
                },
            });
        }
    }

    return {
        handleOpen,
        handleChange,
        handleChangeCrearEspecialista,
        handleEditarEspecialista,
        handleDelete,
        handleCrearEspecialista,
        especialistaSeleccionado,
        handleDescartarCambiosEditarEspecialista,
        handleDescartarCambiosCrearEspecialista,

    }
}
