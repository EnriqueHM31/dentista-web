import SERCIVIO2 from "@/assets/servicios/servicio2.svg";
import { MdOutlineSecurity } from "react-icons/md";
import { VENTAJAS } from "@/assets/ts/constantes";
import { motion } from "framer-motion";
import TituloSeccion from "./ui/TituloSeccion";

export default function SectionVentajas() {
    return (
        <motion.section className="max-w-10/12 w-full mx-auto py-5 xl:py-10 px-1 md:px-10 lg:px-20 xl:px-10  gap-12 flex items-center min-h-[70dvh] bg-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.picture className="flex-1 flex items-center justify-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                }}
            >
                <img src={SERCIVIO2} alt="Imagen servicio 2" className="w-full max-w-3/5 h-full object-cover" />
            </motion.picture>
            <motion.div className="flex-1 flex flex-col gap-4"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }} transition={{
                    duration: 0.3,
                    ease: "easeOut",
                }}
            >
                <TituloSeccion titulo="¿Por qué elegir Smile para todos tus tratamientos dentales?" clases="text-4xl font-bold" />
                <p>Utilizamos solo los materiales de la mejor calidad en el mercado para ofrecer los mejores productos a nuestros pacientes.</p>
                <ul className="flex flex-col gap-3">
                    {
                        VENTAJAS.map((ventaja) => (
                            <li key={ventaja.name} className="flex items-center gap-2">
                                <MdOutlineSecurity className="text-2xl text-primary border border-primary rounded-full p-1" />
                                <p>{ventaja.name}</p>
                            </li>
                        ))
                    }
                </ul>

                <button className="w-fit rounded-lg px-3 py-2 bg-primary text-white hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer ">Realizar una cita</button>
            </motion.div>
        </motion.section>
    )
}