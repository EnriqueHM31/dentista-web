import IMAGENSERVICIO1 from "@/assets/servicios/servicio1.webp";
import { motion } from "framer-motion";
import TituloSeccion from "@/components/Inicio/ui/TituloSeccion";

export default function SectionTelefono() {
    return (
        <motion.section className="min-h-screen flex xl:flex-row flex-col items-center justify-center max-w-11/12 md:max-w-10/12 w-full mx-auto py-20 xl:py-10 px-1 md:px-10 lg:px-20 xl:px-10  gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}

        >
            <div className="flex flex-col gap-4 flex-1">

                <TituloSeccion titulo="Estamos aceptando nuevos pacientes y no podemos esperar para conocerte" clases="font-bold" />

                <p>Utilizamos solo los materiales de la mejor calidad en el mercado para ofrecer los mejores productos a nuestros pacientes, así que no te preocupes por nada y reserva tu cita.</p>

            </div>

            <picture className="relative flex items-center justify-center flex-1 "
            >
                <div className="xl:size-90 md:size-75 size-45 w-full max-w-11/12 relative">
                    <div className="absolute -z-10 w-full h-full inset-0 flex xl:items-center items-end xl:justify-center xl:flex-1 bg-gradient-to-tr to-primary from-indigo-950 from-60% translate-x-7"></div>
                    <img src={IMAGENSERVICIO1} alt="Imagen servicio 1" className="w-full h-full object-cover translate-y-5 " />
                </div>
            </picture>
        </motion.section >
    )
}