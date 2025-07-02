import type { SocialProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useSociales() {
    const [social, setSocial] = useState<SocialProps[]>([]);
    const originalSocialRef = useRef<SocialProps[]>([]); // 👈 Referencia mutable
    const [editMode, setEditMode] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const obtenerDatosSociales = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/sociales`);
                const { message } = await res.json();
                if (!Array.isArray(message)) throw new Error('El formato recibido no es un arreglo');

                setSocial(message);
                originalSocialRef.current = message; // 👈 Guardamos datos originales sin setState
            } catch (err) {
                console.error(err);
                toast.error('Error al cargar redes sociales');
            }
        };

        obtenerDatosSociales();
    }, []);

    const handleEditClick = (id: string) => {
        setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleChange = (id: string, value: string) => {
        setSocial((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, referencia: value } : item
            )
        );
    };

    const handleGuardar = async () => {
        const cambios = social.filter((item) => {
            const original = originalSocialRef.current.find((o) => o.id === item.id);
            return original && original.referencia !== item.referencia;
        });

        if (cambios.length === 0) {
            toast.info('No hay cambios para guardar');
            return;
        }

        try {
            for (const cambio of cambios) {
                await fetch(`${import.meta.env.VITE_API_URL}/sociales/${cambio.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ referencia: cambio.referencia }),
                });
            }

            toast.success('Cambios guardados exitosamente');
            originalSocialRef.current = [...social];
            setEditMode({});
        } catch (error) {
            console.error('Error al guardar cambios', error);
            toast.error('Error al guardar los cambios');
        }
    };

    return {
        social,
        handleEditClick,
        handleChange,
        handleGuardar,
        editMode,
    };
}
