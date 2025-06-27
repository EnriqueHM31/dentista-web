import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import FondoHero from "@/components/ui/FondoHero";

export default function Inicio() {
    return (
        <>
            <FondoHero />
            <Hero />
            <Servicios />
            <section className="min-h-screen"></section>
        </>
    );
}
