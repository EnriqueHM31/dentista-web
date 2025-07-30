import TituloSeccion from "@/components/Inicio/ui/TituloSeccion";
import { usePreguntasContext } from "@/context/Preguntas";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";


export default function SectionPreguntas() {
    // Inicializamos en 0 para que la primera pregunta esté activa al cargar
    const [preguntaActiva, setPreguntaActiva] = useState<number>(0);
    const { preguntas } = usePreguntasContext();

    const handleClick = (index: number) => {
        setPreguntaActiva(prev => (prev === index ? -1 : index));
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
                {preguntas.map(({ pregunta }, index) => (
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
            <div className="flex-1 w-full flex items-start justify-center">
                <AnimatePresence mode="wait">
                    {preguntaActiva !== -1 && preguntas[preguntaActiva] && (
                        <motion.div
                            key={preguntaActiva}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8 bg-primary text-white p-6 rounded-xl max-w-2xl w-full shadow-lg"
                        >
                            <h3 className="text-xl font-semibold mb-2">
                                {preguntas[preguntaActiva].pregunta}
                            </h3>
                            <p>{preguntas[preguntaActiva].respuesta}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
}
