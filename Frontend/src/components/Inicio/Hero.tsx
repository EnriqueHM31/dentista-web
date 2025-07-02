import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import Tooltip from '@/components/general/Tooltip';
import { useUtils } from "@/hooks/general/useUtils";

export default function Hero() {
    const { handleClickCopy } = useUtils();

    return (
        <motion.section
            className="max-w-11/12 w-full mx-auto py-5 xl:py-10 px-1 md:px-10 lg:px-20 xl:px-10 flex flex-col xl:flex-row items-start justify-center xl:justify-between gap-6 mt-20 overflow-hidden xl:max-w-10/12 relative xl:min-h-screen min-h-[150dvh]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
        >


            {/* Textos animados */}
            <motion.div
                className='flex-1 xl:max-w-1/2  flex items-center xl:items-start justify-start xl:justify-start gap-3 flex-col text-center xl:text-start order-2 xl:order-1 w-full'
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-2xl font-bold xl:text-5xl text-white">¡Prepárate para tu mejor experiencia dental!</h2>
                <p className='text-normal text-white/50'>
                    Usamos solo los materiales de la mejor calidad del mercado para ofrecer los mejores tratamientos a nuestros pacientes.
                </p>
                <p className='text-normal text-white/50'>
                    Así que no te preocupes por nada y reserva tu cita.
                </p>

                {/* Botón emergencias */}
                <motion.div
                    className='flex items-center xl:items-start gap-4 flex-col mt-5 w-full'
                    initial={{ opacity: 0, x: -200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.5
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Tooltip text="Copiar contacto" position="top">
                        <motion.button
                            className='flex items-center gap-4 transition-transform bg-white border border-primary duration-300 ease-in-out rounded-2xl px-4 py-3 shadow-xs shadow-primary relative w-full max-w-md cursor-pointer'
                            onClick={() => handleClickCopy("2731266282", "El teléfono de emergencias dentales fue copiado")}
                        >
                            <div className='p-2 rounded-2xl border border-primary size-10 flex gap-2'>
                                <FaPhone className="text-xl text-primary" />
                            </div>
                            <div className='flex flex-col gap-2 items-start'>
                                <h3 className='text-start text-xs'>Emergencias dentales 24 horas</h3>
                                <p className='text-start text-xs'>273 543 321 ***</p>
                            </div>
                        </motion.button>
                    </Tooltip>
                </motion.div>
                {/* Tarjeta profesional */}
                <motion.div
                    className='flex items-center xl:items-start gap-4 flex-col mt-5 w-full'
                    key={'article-presentacion'}
                    initial={{ opacity: 0, x: -200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 1
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.a
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        className='flex flex-col gap-4 p-4 rounded-2xl shadow-md transition-all duration-500 ease-in hover:shadow-gray-900 relative max-w-md w-full bg-white'
                    >
                        <IoLogoLinkedin className='text-3xl text-primary absolute top-6 right-6' />
                        <div className='flex items-center gap-4'>
                            <img src="https://randomuser.me/api/portraits/thumb/women/70.jpg" alt="dentista" className="rounded-full w-full h-full max-w-10 object-contain" />
                            <div>
                                <h3 className='text-sm font-bold'>Samantha Edison</h3>
                                <p className='text-xs'>Dental Specialist</p>
                            </div>
                        </div>
                        <p className='text-sm'>
                            Tratamientos dentales de alta calidad realizados por expertos en el área, altamente recomendados para todos
                        </p>
                    </motion.a>
                </motion.div>
            </motion.div>



        </motion.section >
    );
}
