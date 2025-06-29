import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TituloSeccion from "@/components/ui/TituloSeccion";
import { PREGUNTASFRECUENTES } from "@/assets/ts/constantes";

export default function SectionPreguntas() {
    const [preguntaActiva, setPreguntaActiva] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setPreguntaActiva(prev => (prev === index ? null : index));
    };

    return (
        <motion.section
            className="mx-auto w-full gap-8 mt-20 py-20 md:py-15 xl:py-10 min-h-screen flex flex-col items-center max-w-7xl px-4 justify-center"
            id="servicios"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <TituloSeccion titulo="Preguntas frecuentes" clases="text-center" />

            <p className="max-w-3xl text-center text-gray-600">
                Utilizamos solo los materiales de la mejor calidad en el mercado para proporcionar los mejores productos a nuestros pacientes.
            </p>

            {/* Lista de etiquetas */}
            <div className="flex flex-wrap justify-center gap-4 mt-10 w-full">
                {PREGUNTASFRECUENTES.map(({ pregunta }, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`px-4 py-2 rounded-full border transition-colors duration-200 cursor-pointer text-sm font-medium ${preguntaActiva === index
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
                            }`}
                    >
                        {pregunta}
                    </button>
                ))}
            </div>

            {/* Respuesta visible */}
            <AnimatePresence mode="wait">
                {preguntaActiva !== null && (
                    <motion.div
                        key={preguntaActiva}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-8 bg-primary text-white p-6 rounded-xl max-w-2xl w-full shadow-lg"
                    >
                        <h3 className="text-xl font-semibold mb-2">
                            {PREGUNTASFRECUENTES[preguntaActiva].pregunta}
                        </h3>
                        <p>{PREGUNTASFRECUENTES[preguntaActiva].respuesta}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
