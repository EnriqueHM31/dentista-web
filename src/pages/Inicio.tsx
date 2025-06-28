import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import FondoHero from "@/components/ui/FondoHero";
import SectionTelefono from "@/components/SectionTelefono";
import SectionVentajas from "@/components/SectionVentajas";
import SectionVideo from "@/components/SectionVideo";
import SectionEspecialistas from "@/components/SectionEspecialistas";
import SectionComentarios from "@/components/SectionComentarios";



export default function Inicio() {
    return (
        <>
            <FondoHero />
            <Hero />
            <Servicios />
            <SectionTelefono />
            <SectionVentajas />
            <SectionVideo />
            <SectionEspecialistas />
            <SectionComentarios />
        </>
    );
}
