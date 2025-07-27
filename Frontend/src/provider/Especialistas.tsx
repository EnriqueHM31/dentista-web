import { getEspecialistas } from "@/services/Especialistas";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EspecialistasContext } from "@/context/Especialistas";
import type { EspecialistaProps } from "@/types/Especialistas/types";
import type { UUID } from "@/types/types";

export function EspecialistasProvider({ children }: { children: React.ReactNode }) {
    const [especialistas, setEspecialistas] = useState<EspecialistaProps[]>([]);

    useEffect(() => {
        const obtenerEspecialistas = async () => {
            const { success, message, especialistas } = await getEspecialistas();

            if (!success) {
                toast.error(message);
                return;
            }

            setEspecialistas(especialistas);
        };
        obtenerEspecialistas();
    }, []);

    const ordenarEspecialistas = (especialistas: EspecialistaProps[]) => {
        return [...especialistas].sort((a, b) => {
            const nombreA = `${a.nombre} ${a.apellido}`.toLowerCase();
            const nombreB = `${b.nombre} ${b.apellido}`.toLowerCase();
            return nombreA.localeCompare(nombreB);
        });
    };

    const refrescarEspecialistasCrear = (especialistaCreado: EspecialistaProps) => {
        setEspecialistas(prev => ordenarEspecialistas([...prev, especialistaCreado]));
    }

    const refrescarEspecialistasEditar = (id: UUID, cambios: Partial<EspecialistaProps>) => {
        setEspecialistas(prev =>
            ordenarEspecialistas(
                prev.map(esp =>
                    esp.id === id ? { ...esp, ...cambios } : esp
                )
            )
        );
    }

    const refrescarEspecialistasEliminar = (id: UUID) => {
        setEspecialistas(prev => prev.filter((esp) => esp.id !== id));
    }

    return (
        <EspecialistasContext.Provider value={{ especialistas, setEspecialistas, ordenarEspecialistas, refrescarEspecialistasEditar, refrescarEspecialistasEliminar, refrescarEspecialistasCrear }}>
            {children}
        </EspecialistasContext.Provider>
    )

}