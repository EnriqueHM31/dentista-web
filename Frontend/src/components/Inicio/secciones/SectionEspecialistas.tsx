import TituloSeccion from "@/components/Inicio/ui/TituloSeccion";
import Carousel from "@/components/Inicio/ui/carousel";
import { useEspecialistasContext } from "@/context/Especialistas";
import { motion } from "framer-motion";

export default function SectionEspecialistas() {

    const { especialistas } = useEspecialistasContext();

    return (
        <motion.section className="min-h-screen flex flex-col items-center justify-center max-w-11/12 xl:max-w-10/12 w-full mx-auto py-5 xl:py-10 px-1 md:px-10 lg:px-20 xl:px-0 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <TituloSeccion titulo="Conoce a nuestros especialistas" clases="text-center" />
            <p className="max-w-full xl:max-w-3/4 w-full text-center">Utilizamos únicamente los materiales de la más alta calidad disponibles en el mercado para brindar los mejores tratamientos a nuestros pacientes.</p>


            <motion.div className="flex flex-col items-center justify-center relative overflow-x-hidden w-full h-full     md:max-w-10/12 bg-primary rounded-2xl md:aspect-[16/7] aspect-[16/26] pb-6 md:py-0 "
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <Carousel slides={especialistas} />
            </motion.div>
        </motion.section>
    )
}