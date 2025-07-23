"use server"

import { EspecialistasContext } from "@/context/Especialistas";
import type { Especialista } from "@/types";
import { esURLValida } from "@/utils/constantes";
import { useContext, useRef, useState } from "react";
import { toast } from "sonner";


interface PropsHookEspecialistas {
    especialistas: Especialista[];
    toggle: (id: string) => void;
    handleClickDesactivarModal: () => void;
}

const INITIAL_ESPECIALISTA: Omit<Especialista, "id"> = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    linkedin: "",
    avatar: "",
    servicio: "",
}

export function useEspecialistas({ especialistas, toggle, handleClickDesactivarModal }: PropsHookEspecialistas) {
    const { setEspecialistas, ordenarEspecialistas } = useContext(EspecialistasContext);
    const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState<Especialista | null>(null);
    const [especialistaCrear, setEspecialistaCrear] = useState<Omit<Especialista, "id">>(INITIAL_ESPECIALISTA);
    const especialistaRef = useRef<Omit<Especialista, "id">>(INITIAL_ESPECIALISTA);



    const handleOpen = (especialista?: Especialista, modal?: string) => {
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

        const camposCambiados: Partial<Omit<Especialista, "id">> = {};

        // Detectar qué campos cambiaron
        (Object.keys(especialistaRef.current) as (keyof Omit<Especialista, "id">)[]).forEach((key) => {
            if (especialistaRef.current[key] !== especialistaSeleccionado?.[key]) {
                camposCambiados[key] = especialistaSeleccionado?.[key];
            }
        });

        if (Object.keys(camposCambiados).length === 0) {
            toast.info("No hay cambios para guardar.");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/especialistas/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(camposCambiados),
            });

            const { success, message, cambios } = await response.json();

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

    const handleDelete = async (id: string) => {
        toast("Estas seguro de eliminar este especialista", {
            action: {
                label: "Eliminar",
                onClick: async () => {

                    const response = await fetch(`${import.meta.env.VITE_API_URL}/especialistas/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Error al eliminar el especialista");
                    }

                    const { success, message } = await response.json();

                    if (success) {
                        toast.success(message);
                        setEspecialistas(especialistas.filter((esp) => esp.id !== id));
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
        console.log(especialistaCrear);
        const { avatar, linkedin } = especialistaCrear;

        if (!esURLValida(avatar)) {
            return { success: false, message: "La URL de la imagen no es válida", especialistaCreado: null };
        }

        if (!esURLValida(linkedin)) {
            return { success: false, message: "La URL de linkedIn no es válida", especialistaCreado: null };
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/especialistas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(especialistaCrear),
            });

            const { success, message, especialista: especialistaCreado } = await response.json();

            if (success) {
                toast.success(message);
                setEspecialistas(prev => ordenarEspecialistas([...prev, especialistaCreado as Especialista]));
                handleClickDesactivarModal();
            } else {
                toast.error(message);
            }

        } catch {
            toast.error("Error al crear el especialista.");
        }
    };

    const handleDescartarCambiosEditarEspecialista = () => {

        const sonIguales = Object.keys(especialistaRef.current).every(key => especialistaRef.current[key as keyof Omit<Especialista, "id">] === especialistaSeleccionado?.[key as keyof Omit<Especialista, "id">]);

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

    return {
        handleOpen,
        handleChange,
        handleChangeCrearEspecialista,
        handleEditarEspecialista,
        handleDelete,
        handleCrearEspecialista,
        especialistaSeleccionado,
        handleDescartarCambiosEditarEspecialista,

    }
}
