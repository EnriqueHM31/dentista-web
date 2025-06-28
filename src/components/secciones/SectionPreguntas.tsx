import { motion } from "framer-motion";
import TituloSeccion from "@/components/ui/TituloSeccion";
import { PREGUNTASFRECUENTES } from "@/assets/ts/constantes";
import FAQItem from "../Preguntas/FAQItem";

export default function SectionPreguntas() {
    return (
        <motion.section className="mx-auto w-full gap-8 mt-20 py-20 md:py-15 xl:py-10 min-h-screen flex justify-center flex-col items-center max-w-10/12 " id="servicios"
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


            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 w-full justify-center ">
                {
                    PREGUNTASFRECUENTES.map(({ pregunta, respuesta }, index) => (
                        <li key={index} className="flex flex-col gap-2 p-4 bg-primary rounded-2xl w-full">

                            <FAQItem pregunta={pregunta} respuesta={respuesta} />

                        </li>
                    ))
                }
            </ul>
        </motion.section>
    )
}