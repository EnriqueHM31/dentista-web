import IMAGENSERVICIO1 from "@/assets/servicios/servicio1.webp";
import { motion } from "framer-motion";

export default function SectionTelefono() {
    return (
        <motion.section className="min-h-screen flex xl:flex-row flex-col items-center justify-center max-w-10/12 w-full mx-auto py-5 xl:py-10 px-1 md:px-10 lg:px-20 xl:px-10  gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}

        >
            <div className="flex flex-col gap-4 flex-1">
                <motion.h2 className="font-bold text-4xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }} transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                >Estamos aceptando nuevos pacientes y no podemos esperar para conocerte</motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }} transition={{
                        duration: 0.3,
                        delay: .5,
                        ease: "easeOut",
                    }}
                >Utilizamos solo los materiales de la mejor calidad en el mercado para ofrecer los mejores productos a nuestros pacientes, así que no te preocupes por nada y reserva tu cita.</motion.p>

                <motion.form action="#" className="flex items-center gap-5 w-full max-w-3/4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }} transition={{
                        duration: 0.3,
                        delay: 1,
                        ease: "easeOut",
                    }}
                >
                    <input type="tel" name="phone" id="phone" inputMode="tel" placeholder="Ingresa tu número de teléfono" className="w-full rounded-lg px-3 py-2 text-black border border-gray-400  outline-blue-400 placeholder:text-gray-400 flex-2" required />
                    <button type="submit" className="w-fit rounded-lg px-3 py-2 bg-primary text-white hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer">Enviar</button>
                </motion.form>
            </div>

            <motion.picture className="relative flex items-center justify-center flex-1 "
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    delay: 1.5,
                    ease: "easeOut",
                }}
            >
                <div className="size-90 relative">
                    <div className="absolute -z-10 w-full h-full inset-0 flex xl:items-center items-end xl:justify-center xl:flex-1 bg-gradient-to-tr to-primary from-teal-300 from-60% translate-x-7"></div>
                    <img src={IMAGENSERVICIO1} alt="Imagen servicio 1" className="w-full h-full object-cover translate-y-5 " />
                </div>
            </motion.picture>
        </motion.section>
    )
}