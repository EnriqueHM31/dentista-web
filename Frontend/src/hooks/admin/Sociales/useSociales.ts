import { useSocialesContext } from "@/context/Sociales";
import { updateSocial } from "@/services/Sociales";
import type { SocialProps } from "@/types/Sociales/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { SocialEditarProps } from "@/types/Sociales/types";

export function useSociales() {
    const [editMode, setEditMode] = useState<SocialEditarProps>({});
    const { sociales, setSociales } = useSocialesContext();
    const originalSocialRef = useRef<SocialProps[]>([]);

    useEffect(() => {
        if (sociales.length > 0 && originalSocialRef.current.length === 0) {
            originalSocialRef.current = [...sociales]; // Clonar solo la primera vez
        }
    }, [sociales]);

    const handleEditClick = (id: `${string}-${string}-${string}-${string}-${string}`) => {
        setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleChange = (id: string, value: string) => {
        setSociales((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, referencia: value } : item
            )
        );
    };

    const handleEditarRedSocial = async () => {
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
        } catch {
            toast.error('Error al guardar los cambios');
        }
    };

    return {
        sociales,
        handleEditClick,
        handleChange,
        handleEditarRedSocial,
        editMode,
    };
}
