import AsideMenu from "@/components/login/AsideMenu";
import Perfil from "@/components/login/secciones/Perfil";
import Sociales from "./secciones/Sociales";
import ListaPreguntas from "./secciones/Preguntas";
import { useNavAsideLocal } from "@/hooks/general/useNavAsideLocal";
import Servicios from "./secciones/Servicios";
import { SocialesProvider } from "@/context/Sociales";
import { ServicioProvider } from "@/context/Servicio";
import { PreguntasProvider } from "@/context/Preguntas";

export default function Dashboard() {
    const { selected, handleClickSelected } = useNavAsideLocal();

    return (
        <div className="flex min-h-screen bg-white">
            <AsideMenu handleClickSelected={handleClickSelected} selected={selected} />

            {/* Main content */}
            <main className="flex-1 p-6 h-screen overflow-auto">
                <div className="bg-white rounded shadow">
                    {selected === "perfil" && <Perfil />}
                    {selected === "servicios" && <ServicioProvider> <Servicios /> </ServicioProvider>}
                    {selected === "share" && <SocialesProvider > <Sociales /> </SocialesProvider>}
                    {selected === "faq" && <PreguntasProvider> <ListaPreguntas /> </PreguntasProvider>}
                    {selected === "logout" && <p>¿Seguro que quieres cerrar sesión?</p>}
                </div>
            </main>
        </div>
    );
}
