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
import { EspecialistasProvider } from "@/provider/Especialistas";
import Comentarios from "./Secciones/Comentarios";
import { useProtegerRutaPrivada } from "@/hooks/admin/Perfil/useProtegerRutaPrivada";
import Especialistas from "./Secciones/Especialistas";
import CitasProvider from "@/provider/Citas";


export default function Dashboard() {
    const { selected, handleClickSelected } = useNavAsideLocal();
    useProtegerRutaPrivada();

    return (
        <div className="flex min-h-screen bg-white">
            <AsideMenu handleClickSelected={handleClickSelected} selected={selected} />

            {/* Main content */}
            <main className="flex-1 py-16 max-w-11/12 md:max-w-full mx-auto w-full md:p-6 p-2 min-h-screen md:h-screen overflow-auto">
                <div className="bg-white rounded shadow">
                    {selected === "perfil" && <CitasProvider><Perfil />   </CitasProvider>}
                    {selected === "servicios" && <ServicioProvider> <Servicios /> </ServicioProvider>}
                    {selected === "share" && <SocialesProvider > <Sociales /> </SocialesProvider>}
                    {selected === "faq" && <PreguntasProvider> <ListaPreguntas /> </PreguntasProvider>}
                    {selected === "comentarios" && <ComentariosProvider> <Comentarios /> </ComentariosProvider>}
                    {selected === "especialistas" &&
                        <EspecialistasProvider>
                            <ServicioProvider>
                                <Especialistas />
                            </ServicioProvider>
                        </EspecialistasProvider>}
                </div>
            </main>
        </div>
    );
}
