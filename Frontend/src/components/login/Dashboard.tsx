import AsideMenu from "@/components/login/AsideMenu";
import Perfil from "@/components/login/secciones/Perfil";
import Sociales from "./secciones/Sociales";
import ListaPreguntas from "./secciones/Preguntas";
import { useNavAsideLocal } from "@/hooks/admin/useNavAsideLocal";

export default function Dashboard() {
    const { selected, handleClickSelected } = useNavAsideLocal();

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
