import Hero from "@/components/Inicio/Hero";
import FondoHero from "@/components/Inicio/ui/FondoHero";
import SectionTelefono from "@/components/Inicio/Secciones/SectionTelefono";
import SectionVentajas from "@/components/Inicio/Secciones/SectionVentajas";
import SectionVideo from "@/components/Inicio/Secciones/SectionVideo";
import SectionEspecialistas from "@/components/Inicio/Secciones/SectionEspecialistas";
import SectionComentarios from "@/components/Inicio/Secciones/SectionComentarios";
import SectionPreguntas from "@/components/Inicio/Secciones/SectionPreguntas";
import { PreguntasProvider } from "@/provider/Preguntas";
import { ComentariosProvider } from "@/provider/Comentarios";

export default function Inicio() {
    return (
        <>
            <PreguntasProvider>
                <ComentariosProvider>

                    <FondoHero />
                    <Hero />
                    <SectionTelefono />
                    <SectionVentajas />
                    <SectionVideo />
                    <SectionEspecialistas />
                    <SectionComentarios />
                    <SectionPreguntas />

                </ComentariosProvider>


            </PreguntasProvider>
        </>
    );
}
