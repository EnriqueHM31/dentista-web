import { EspecialistasContext } from "@/context/Especialistas";
import type { Especialista } from "@/types";
import { useContext, useState } from "react";
import { toast } from "sonner";

interface PropsHookEspecialistas {
    especialistas: Especialista[];
    toggle: () => void;
}

export function useEspecialistas({ especialistas, toggle }: PropsHookEspecialistas) {
    const { setEspecialistas } = useContext(EspecialistasContext);
    const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState<Especialista | null>(null);


    const handleOpen = (especialista: Especialista) => {
        setEspecialistaSeleccionado(especialista);
        toggle(); // abre el modal
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
            toggle(); // cierra el modal
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

    return {
        handleOpen,
        handleChange,
        handleSubmit,
        handleDelete,
        especialistaSeleccionado,
    }
}
