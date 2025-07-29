import type { UUID } from "../types";

export interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    children: React.ReactNode;
    clases?: string;
    modalId?: string; // ID de esta modal
    activeId?: string | null; // ID de la modal activa global
}

export interface ModalCitaProps {
    evento: {
        id: string;
        title: string;
        start: string | Date;
        extendedProps: {
            nombre: string;
            email: string;
            telefono: string;
            comentarios: string;
            servicio: string;
            fecha: string;
            hora: string;
            completada: boolean;
            aceptada: boolean;
        };
    } | null;
    onCitaCompletada: ({ id }: { id: UUID }) => void;
    onCitaEliminada: ({ id }: { id: UUID }) => void;
    onCitaAceptada: ({ id }: { id: UUID }) => void;
}