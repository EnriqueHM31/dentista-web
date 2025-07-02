import { useState } from "react";

export function useModalIndependiente() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const handleClickDesactivarModal = () => {
        setActiveModal(null);
    }

    const handleClickActivarModalIndependiente = (modal: string) => {
        setActiveModal(modal);
    }

    return {
        activeModal,
        handleClickDesactivarModal,
        handleClickActivarModalIndependiente
    }
}