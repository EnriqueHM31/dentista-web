import { updateSocial } from "@/services/Sociales";
import type { SocialesEditadasProps, SocialProps } from "@/types/Sociales/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { SocialEditarProps } from "@/types/Sociales/types";
import { useSocialesContext } from "@/context/Sociales";
import type { UUID } from "@/types/types";
import { ExistenModificacionesSociales } from "@/utils/Cambios";


export function useSociales() {
    const { sociales } = useSocialesContext();
    const [editMode, setEditMode] = useState<SocialEditarProps>({});
    const [SocialEdit, setSocialEdit] = useState<SocialProps[]>(sociales);
    const originalSocialRef = useRef<SocialProps[]>([]);

    useEffect(() => {
        if (sociales.length > 0 && originalSocialRef.current.length === 0) {
            originalSocialRef.current = [...sociales]; // Clonar solo la primera vez
            setSocialEdit(sociales);
        }
    }, [sociales]);

    const handleEditClick = (id: UUID) => {
        setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleChange = (id: UUID, value: string) => {
        setSocialEdit(prev => prev.map(s => s.id === id ? { ...s, referencia: value } : s));
    };

    const handleEditarRedSocial = async () => {
        const cambiosSociales = ExistenModificacionesSociales({ SocialEdit, originalSocialRef });

        if (cambiosSociales.length === 0) {
            toast.info('No hay cambios para guardar');
            return;
        }

        try {
            const redesActualizadas: SocialesEditadasProps = [];

            for (const cambio of cambiosSociales) {
                const { id, referencia, nombre } = cambio;

                const { success, message, redSocial } = await updateSocial({ id, referencia });

                if (!success) {
                    toast.error(`Error al actualizar ${nombre}: ${message}`);
                    return;
                }

                redesActualizadas.push(redSocial);
            }

            const nombresModificados = cambiosSociales.map(c => c.nombre).join(", ");
            toast.success(`Cambios guardados exitosamente en: ${nombresModificados}`);

            setSocialEdit(prev => prev.map((red) => {
                const actualizada = redesActualizadas.find((r) => r.id === red.id);
                return actualizada ? { ...red, ...actualizada } : red;
            }));

            setEditMode({});
        } catch {
            toast.error("Error al guardar los cambios");
        }
    };


    return {
        sociales,
        SocialEdit,
        handleEditClick,
        handleChange,
        handleEditarRedSocial,
        editMode,
    };
}
