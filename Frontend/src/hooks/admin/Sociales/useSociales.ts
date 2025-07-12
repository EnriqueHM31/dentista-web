import { SocialesContext } from "@/context/Sociales";
import { updateSocial } from "@/services/Sociales";
import type { SocialProps } from "@/types";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useSociales() {
    const [editMode, setEditMode] = useState<Record<string, boolean>>({});
    const { sociales, setSociales } = useContext(SocialesContext);
    const originalSocialRef = useRef<SocialProps[]>([]);

    useEffect(() => {
        if (sociales.length > 0 && originalSocialRef.current.length === 0) {
            originalSocialRef.current = [...sociales]; // Clonar solo la primera vez
        }
    }, [sociales]);

    const handleEditClick = (id: string) => {
        setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleChange = (id: string, value: string) => {
        setSociales((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, referencia: value } : item
            )
        );
    };

    const handleGuardar = async () => {
        const cambios = sociales.filter((item) => {
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
            originalSocialRef.current = [...sociales];
            setEditMode({});
        } catch (error) {
            console.error('Error al guardar cambios', error);
            toast.error('Error al guardar los cambios');
        }
    };

    return {
        sociales,
        handleEditClick,
        handleChange,
        handleGuardar,
        editMode,
    };
}
