import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useComentarios } from "@/hooks/inicio/useComentarios";
import Testimonio from "@/components/Inicio/Comentarios/Testimonio";
import TituloSeccion from "@/components/Inicio/ui/TituloSeccion";
import Tooltip from "@/components/General/Tooltip";
import { ComentariosContext } from "@/context/Comentarios";
import { useContext } from "react";

export default function SectionComentarios() {

    const { comentariosVisibles } = useContext(ComentariosContext);



    const { page, totalPages, startIndex, visibleTestimonials, handleNext, handlePrevious } = useComentarios(comentariosVisibles);

    return (
        <motion.section
            className="min-h-screen flex flex-col items-center justify-center max-w-10/12 w-full mx-auto px-4 py-10 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <TituloSeccion titulo="Nuestros Clientes Felices" clases="text-center" />
            <p className="max-w-3xl text-center text-gray-600">
                Utilizamos solo los materiales de la mejor calidad en el mercado para proporcionar los mejores productos a nuestros pacientes.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-10 w-full">
                {visibleTestimonials.map(({ id, mensaje, nombre, ranking }, index) => (
                    <Testimonio
                        key={id}
                        client_name={nombre}
                        rating={ranking}
                        comment={mensaje}
                        index={index + startIndex}
                    />
                ))}
            </ul>

            <div className="flex items-center justify-center gap-6 mt-8">
                <Tooltip text="Página anterior" position="top">
                    <button
                        onClick={handlePrevious}
                        disabled={page === 0}
                        className={`p-2 size-10 rounded-full cursor-pointer transition duration-300 ${page === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-black/80"
                            }`}
                        aria-label="Página anterior"
                    >
                        <FaArrowLeft className="text-xl" />
                    </button>
                </Tooltip>

                <span className="text-sm font-medium text-gray-600">
                    Página {page + 1} de {totalPages}
                </span>


                <Tooltip text="Página siguiente" position="top">
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages - 1}
                        className={`p-2 size-10 rounded-full cursor-pointer  transition duration-300 ${page === totalPages - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-black/80"
                            }`}
                        aria-label="Página siguiente"
                    >
                        <FaArrowRight className="text-xl" />
                    </button>
                </Tooltip>
            </div>
        </motion.section >
    );
}
