import { useState } from "react";

export function useModalIndependiente() {
    const [activeModal, setActiveModal] = useState<string | boolean | null>(null);

    const handleClickDesactivarModal = () => {
        setActiveModal(null);
    }

    const handleClickActivarModalIndependiente = (modal: string | boolean) => {
        setActiveModal(modal);
    }

    return {
        activeModal,
        handleClickDesactivarModal,
        handleClickActivarModalIndependiente
    }
}