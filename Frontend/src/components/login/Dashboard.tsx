import AsideMenu from "@/components/login/AsideMenu";
import Perfil from "@/components/login/Secciones/Perfil";
import Sociales from "./Secciones/Sociales";
import ListaPreguntas from "./Secciones/Preguntas";
import { useNavAsideLocal } from "@/hooks/general/useNavAsideLocal";
import Servicios from "./Secciones/Servicios";
import { SocialesProvider } from "@/provider/Sociales";
import { ServicioProvider } from "@/provider/Servicios";
import { PreguntasProvider } from "@/provider/Preguntas";
import { ComentariosProvider } from "@/provider/Comentarios";
import Comentarios from "./Secciones/Comentarios";
import { useCheckearAutenticacion } from "@/hooks/admin/Perfil/useVerificar";


export default function Dashboard() {
    const { selected, handleClickSelected } = useNavAsideLocal();
    useCheckearAutenticacion();
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
                    {selected === "comentarios" && <ComentariosProvider> <Comentarios /> </ComentariosProvider>}
                    {selected === "logout" && <p>¿Seguro que quieres cerrar sesión?</p>}
                </div>
            </main>
        </div>
    );
}
