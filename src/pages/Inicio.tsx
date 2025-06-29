import Hero from "@/components/Inicio/Hero";
import FondoHero from "@/components/Inicio/ui/FondoHero";
import SectionTelefono from "@/components/Inicio/secciones/SectionTelefono";
import SectionVentajas from "@/components/Inicio/secciones/SectionVentajas";
import SectionVideo from "@/components/Inicio/secciones/SectionVideo";
import SectionEspecialistas from "@/components/Inicio/secciones/SectionEspecialistas";
import SectionComentarios from "@/components/Inicio/secciones/SectionComentarios";
import SectionPreguntas from "@/components/Inicio/secciones/SectionPreguntas";



export default function Inicio() {
    return (
        <>
            <FondoHero />
            <Hero />
            <SectionTelefono />
            <SectionVentajas />
            <SectionVideo />
            <SectionEspecialistas />
            <SectionComentarios />
            <SectionPreguntas />
        </>
    );
}
