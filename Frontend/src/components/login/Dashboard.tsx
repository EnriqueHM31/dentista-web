import { useEffect, useState } from "react";
import AsideMenu from "@/components/login/AsideMenu";
import Perfil from "@/components/login/secciones/Perfil";
import Sociales from "./secciones/Sociales";
import ListaPreguntas from "./secciones/Preguntas";

export default function Dashboard() {
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

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AsideMenu handleClickSelected={handleClickSelected} selected={selected} />

            {/* Main content */}
            <main className="flex-1 p-6">
                <div className="bg-white rounded shadow">
                    {selected === "perfil" && <Perfil />}
                    {selected === "servicios" && <p>Administrar servicios ofrecidos.</p>}
                    {selected === "share" && <Sociales />}
                    {selected === "faq" && <ListaPreguntas />}
                    {selected === "logout" && <p>¿Seguro que quieres cerrar sesión?</p>}
                </div>
            </main>
        </div>
    );
}
