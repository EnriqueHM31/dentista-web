import { useEffect, useState } from "react";

export function useNavAsideLocal() {
    const [selected, setSelected] = useState(localStorage.getItem("dashboard_selected") || "perfil");

    // Al cargar, lee el valor de localStorage
    useEffect(() => {
        const saved = localStorage.getItem("dashboard_selected");
        if (saved) setSelected(saved);
    }, []);

    // Cada vez que cambia, lo guarda en localStorage
    const handleClickSelected = (id: string) => {
        setSelected(id);
        localStorage.setItem("dashboard_selected", id);
    };

    return {
        selected,
        handleClickSelected,
    };
}