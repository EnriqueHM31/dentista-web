import { useEffect, useState } from "react";

const DATA_STATUS_SELECTED = {
    perfil: "perfil",
    dashboard: "dashboard_selected",
};

export function useNavAsideLocal() {
    const [selected, setSelected] = useState(localStorage.getItem(DATA_STATUS_SELECTED.dashboard) || DATA_STATUS_SELECTED.perfil);

    // Al cargar, lee el valor de localStorage
    useEffect(() => {
        const saved = localStorage.getItem(DATA_STATUS_SELECTED.dashboard);
        if (saved) setSelected(saved as keyof typeof DATA_STATUS_SELECTED);
    }, []);

    // Cada vez que cambia, lo guarda en localStorage
    const handleClickSelected = (id: keyof typeof DATA_STATUS_SELECTED) => {
        setSelected(id);
        localStorage.setItem(DATA_STATUS_SELECTED.dashboard, id);
    };

    return {
        selected,
        handleClickSelected,
    };
}