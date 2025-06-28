import { motion } from "framer-motion";
import { useState } from "react";
import TituloSeccion from "@/components/ui/TituloSeccion";
import Testimonio from "@/components/Comentarios/Testimonio";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { TESTIMONIOS } from "@/assets/ts/constantes";
import Tooltip from "@/components/ui/Tooltip";


const ITEMS_PER_PAGE = 3;

export default function SectionComentarios() {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(TESTIMONIOS.length / ITEMS_PER_PAGE);

    const startIndex = page * ITEMS_PER_PAGE;
    const visibleTestimonials = TESTIMONIOS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleNext = () => {
        if (page < totalPages - 1) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    };

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
                {visibleTestimonials.map(({ client_name, rating, comment }, index) => (
                    <Testimonio
                        key={index + startIndex}
                        client_name={client_name}
                        rating={rating}
                        comment={comment}
                        index={index + startIndex}
                    />
                ))}
            </ul>

            <div className="flex items-center justify-center gap-6 mt-8">
                <Tooltip text="Página anterior" position="top">
                    <button
                        onClick={handlePrevious}
                        disabled={page === 0}
                        className={`p-2 size-10 rounded-full transition duration-300 ${page === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-black/80"
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
                        className={`p-2 size-10 rounded-full transition duration-300 ${page === totalPages - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-black/80"
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
