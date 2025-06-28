import { motion } from "framer-motion";
import TituloSeccion from "@/components/ui/TituloSeccion";

export default function SectionPreguntas() {
    return (
        <motion.section className="bg-white w-full gap-8 mt-20 py-20 md:py-15 xl:py-10 min-h-screen flex justify-center flex-col items-center " id="servicios"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <TituloSeccion titulo="Preguntas frecuentes" clases="text-center" />
            <p className="max-w-3xl text-center text-gray-600">
                Utilizamos solo los materiales de la mejor calidad en el mercado para proporcionar los mejores productos a nuestros pacientes.
            </p>


            <ul className="flex flex-col gap-4 mt-10">

            </ul>
        </motion.section>
    )
}