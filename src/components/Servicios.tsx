
import { SERVICIOS_DATA } from "@/assets/ts/constantes";
import { motion } from "framer-motion";


export default function Servicios() {
    return (
        <section className="bg-secondary w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 py-10">
            {SERVICIOS_DATA.map((servicio, index) => (
                <motion.article
                    key={servicio.name}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col gap-4 p-4 rounded-2xl max-w-11/12 w-full mx-auto items-center justify-center bg-white shadow-lg"
                >
                    <div className="flex items-center justify-center rounded-full bg-primary size-15">
                        <img
                            src={servicio.img}
                            alt="servicio"
                            className="w-full h-full object-contain max-w-10"
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <h3 className="text-sm font-bold">{servicio.name}</h3>
                        <p className="text-xs">{servicio.description}</p>
                    </div>
                    <a
                        href="#"
                        className="text-primary font-semibold hover:underline hover:text-blue-800 transition-all duration-300 ease-out py-1"
                    >
                        Leer más
                    </a>
                </motion.article>
            ))}
        </section>
    )
}