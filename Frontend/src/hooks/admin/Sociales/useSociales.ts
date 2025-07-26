import { updateSocial } from "@/services/Sociales";
import type { SocialProps } from "@/types/Sociales/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { SocialEditarProps } from "@/types/Sociales/types";
import { useSocialesContext } from "@/context/Sociales";
import type { UUID } from "@/types/types";


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
        const cambios = SocialEdit.filter((item) => {
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

            const nombresModificados = cambios.map(c => c.nombre).join(", ");
            toast.success(`Cambios guardados exitosamente en: ${nombresModificados}`);

            setSocialEdit(prev => {
                const actualizados = prev.map(s => {
                    const cambioAplicado = cambios.find(c => c.id === s.id);
                    return cambioAplicado ? { ...s, referencia: cambioAplicado.referencia } : s;
                });

                // ✅ Actualizar también el ref con esos valores
                originalSocialRef.current = [...actualizados];
                return actualizados;
            });

            // ✅ Salir del modo edición
            setEditMode({});
        } catch {
            toast.error('Error al guardar los cambios');
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
