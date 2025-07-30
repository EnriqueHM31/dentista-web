import FondoHero from "@/components/Inicio/ui/FondoHero";
import Hero from "@/components/Inicio/Secciones/SectionHero";
import SectionComentarios from "@/components/Inicio/Secciones/SectionComentarios";
import SectionEspecialistas from "@/components/Inicio/Secciones/SectionEspecialistas";
import SectionPreguntas from "@/components/Inicio/Secciones/SectionPreguntas";
import SectionTelefono from "@/components/Inicio/Secciones/SectionTelefono";
import SectionVentajas from "@/components/Inicio/Secciones/SectionVentajas";
import SectionVideo from "@/components/Inicio/Secciones/SectionVideo";
import WrapperContextSite from "@/components/General/WrapperContextSite";

export default function Inicio() {
    return (
        <>
            <WrapperContextSite>
                <FondoHero />
                <Hero />
                <SectionTelefono />
                <SectionVentajas />
                <SectionVideo />
                <SectionEspecialistas />
                <SectionComentarios />
                <SectionPreguntas />
            </WrapperContextSite>
        </>
    );
}
