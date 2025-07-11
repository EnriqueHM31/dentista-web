import { getDataSociales, updateSocial } from "@/services/Sociales";
import type { SocialProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useSociales() {
    const [social, setSocial] = useState<SocialProps[]>([]);
    const originalSocialRef = useRef<SocialProps[]>([]);
    const [editMode, setEditMode] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const obtenerDatosSociales = async () => {
            try {
                const { success, message } = await getDataSociales();
                if (!success) {
                    toast.error('Error al cargar redes sociales');
                    return;
                }
                setSocial(message);
                originalSocialRef.current = message;
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
                const { id, referencia } = cambio;

                const { success, message } = await updateSocial(id, referencia);
                if (!success) {
                    toast.error(`Error al actualizar ${cambio.nombre}: ${message}`);
                    return;
                }
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
