import Hero from "@/components/Hero";
import FondoHero from "@/components/ui/FondoHero";
import SectionServicios from "@/components/secciones/SectionServicios";
import SectionTelefono from "@/components/secciones/SectionTelefono";
import SectionVentajas from "@/components/secciones/SectionVentajas";
import SectionVideo from "@/components/secciones/SectionVideo";
import SectionEspecialistas from "@/components/secciones/SectionEspecialistas";
import SectionComentarios from "@/components/secciones/SectionComentarios";



export default function Inicio() {
    return (
        <>
            <FondoHero />
            <Hero />
            <SectionServicios />
            <SectionTelefono />
            <SectionVentajas />
            <SectionVideo />
            <SectionEspecialistas />
            <SectionComentarios />
        </>
    );
}
