import { useEffect, useState } from "react";
import { DATA_STATUS_SELECTED } from "@/constants/Menu";

// Obtenemos todas las claves posibles del objeto DATA_STATUS_SELECTED
type StatusKey = keyof typeof DATA_STATUS_SELECTED;
type StatusValue = (typeof DATA_STATUS_SELECTED)[StatusKey];

export function useNavAsideLocal() {
    const STORAGE_KEY = "nav_selected"; // una clave fija para localStorage

    const [selected, setSelected] = useState<StatusValue>(
        localStorage.getItem(STORAGE_KEY) as StatusValue || DATA_STATUS_SELECTED.perfil
    );

    // Al cargar, lee el valor de localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as StatusValue;
        if (saved) setSelected(saved);
    }, []);

    // Cada vez que cambia, lo guarda en localStorage
    const handleClickSelected = (id: StatusKey) => {
        const value = DATA_STATUS_SELECTED[id];
        setSelected(value);
        localStorage.setItem(STORAGE_KEY, value);
    };

    return {
        selected,
        handleClickSelected,
    };
}
