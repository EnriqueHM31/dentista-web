import Hero from "@/components/Inicio/Secciones/SectionHero";
import FondoHero from "@/components/Inicio/ui/FondoHero";
import SectionTelefono from "@/components/Inicio/Secciones/SectionTelefono";
import SectionVentajas from "@/components/Inicio/Secciones/SectionVentajas";
import SectionVideo from "@/components/Inicio/Secciones/SectionVideo";
import SectionEspecialistas from "@/components/Inicio/Secciones/SectionEspecialistas";
import SectionComentarios from "@/components/Inicio/Secciones/SectionComentarios";
import SectionPreguntas from "@/components/Inicio/Secciones/SectionPreguntas";
import { PreguntasProvider } from "@/provider/Preguntas";
import { ComentariosProvider } from "@/provider/Comentarios";
import { EspecialistasProvider } from "@/provider/Especialistas";

export default function Inicio() {
    return (
        <>
            <PreguntasProvider>
                <ComentariosProvider>
                    <EspecialistasProvider>

                        <FondoHero />
                        <Hero />
                        <SectionTelefono />
                        <SectionVentajas />
                        <SectionVideo />
                        <SectionEspecialistas />
                        <SectionComentarios />
                        <SectionPreguntas />
                    </EspecialistasProvider>


                </ComentariosProvider>


            </PreguntasProvider>
        </>
    );
}
