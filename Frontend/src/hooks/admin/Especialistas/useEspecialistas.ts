"use server"

import { EspecialistasContext } from "@/context/Especialistas";
import type { Especialista } from "@/types";
import { useContext, useState } from "react";
import { toast } from "sonner";

interface CrearEspecialistaState {
    success: boolean;
    message: string;
    especialistaCreado: Especialista | null;
}

interface PropsHookEspecialistas {
    especialistas: Especialista[];
    toggle: (id: string) => void;
    handleClickDesactivarModal: () => void;
}

export function useEspecialistas({ especialistas, toggle, handleClickDesactivarModal }: PropsHookEspecialistas) {
    const { setEspecialistas } = useContext(EspecialistasContext);
    const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState<Especialista | null>(null);


    const handleOpen = (especialista?: Especialista, modal?: string) => {
        setEspecialistaSeleccionado(especialista || null);
        toggle(modal || ""); // abre el modal
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEspecialistaSeleccionado((prev) =>
            prev ? { ...prev, [name]: value } : null
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (especialistaSeleccionado) {
            handleClickDesactivarModal();
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

    const handleCrearEspecialista = async (
        _prevState: CrearEspecialistaState,
        formData: FormData
    ): Promise<CrearEspecialistaState> => {
        // Simula retardo (opcional)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const nombre = formData.get("nombre") as string;
        const apellido = formData.get("apellido") as string;
        const email = formData.get("email") as string;
        const telefono = formData.get("telefono") as string;
        const direccion = formData.get("direccion") as string;
        const servicio = formData.get("servicio") as string;
        const avatar = formData.get("avatar") as string;
        const linkedin = formData.get("linkedin") as string;

        const especialista: Record<string, string> = {
            nombre,
            apellido,
            email,
            telefono,
            direccion,
            servicio,
            avatar,
            linkedin,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/especialistas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(especialista),
            });

            const { success, message, especialista: especialistaCreado } = await response.json();

            return { success, message, especialistaCreado };

        } catch {
            return { success: false, message: "Error de red", especialistaCreado: null };
        }
    };

    return {
        handleOpen,
        handleChange,
        handleSubmit,
        handleDelete,
        handleCrearEspecialista,
        especialistaSeleccionado,
    }
}
