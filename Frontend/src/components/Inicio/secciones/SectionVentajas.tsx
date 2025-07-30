import SERCIVIO2 from "@/assets/servicios/servicio2.svg";
import TituloSeccion from "@/components/Inicio/ui/TituloSeccion";
import { VENTAJAS } from "@/constants/generales";
import { motion } from "framer-motion";
import { MdOutlineSecurity } from "react-icons/md";

export default function SectionVentajas() {
    return (
        <motion.section className="max-w-11/12 md:max-w-10/12 w-full mx-auto py-10 xl:py-10 px-1 md:px-10 lg:px-20 xl:px-10  gap-12 flex items-center min-h-[70dvh] bg-secondary flex-col xl:flex-row overflow-x-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <picture className="flex-1 flex items-center justify-center"
            >
                <img src={SERCIVIO2} alt="Imagen servicio 2" className="w-full max-w-full xl:max-w-3/5 h-full object-cover" />
            </picture>
            <div className="flex-1 flex flex-col gap-4 px-6 xl:px-0"
            >
                <TituloSeccion titulo="¿Por qué elegir Smile para todos tus tratamientos dentales?" clases=" font-bold text-white" />
                <p className="text-white/70">Utilizamos solo los materiales de la mejor calidad en el mercado para ofrecer los mejores productos a nuestros pacientes.</p>
                <ul className="flex flex-col gap-3">
                    {
                        VENTAJAS.map((ventaja) => (
                            <li key={ventaja.name} className="flex items-center gap-2">
                                <MdOutlineSecurity className="text-2xl text-white/70 border border-primary rounded-full p-1" />
                                <p className="text-white/70">{ventaja.name}</p>
                            </li>
                        ))
                    }
                </ul>

                <button className="w-fit rounded-lg px-3 py-2 mt-7 bg-white text-primary hover:bg-white/80 transition duration-300 ease-in-out cursor-pointer ">Realizar una cita</button>
            </div>
        </motion.section>
    )
}