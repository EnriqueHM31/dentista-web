import { motion } from "framer-motion";
import ELIPSE from '@/assets/img/elipse.webp';
import ELIPSE2 from '@/assets/img/elipse2.webp';
import DENTISTA from '@/assets/img/dentista.webp';
import ICONOS from '@/assets/img/iconos.webp';
import { FaPhone } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import Tooltip from '@/components/ui/Tooltip';
import { toast } from 'sonner';

export default function Hero() {
    const handleClickCopy = (text: string, mensaje: string) => {
        if (!navigator.clipboard) {
            toast.error('No se pudo copiar el texto');
            return;
        }
        navigator.clipboard.writeText(text);
        toast.success(mensaje);
    };

    return (
        <motion.section
            className="max-w-11/12 w-full mx-auto py-5 px-1 md:px-10 lg:px-20 xl:px-40 flex flex-col items-center justify-center gap-6 mt-20 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
        >
            {/* Imagen animada */}
            <motion.div
                className="w-full h-40"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="relative w-4/6 mx-auto h-full">
                    <img src={ELIPSE} alt="elipse" className="w-full h-full absolute object-cover z-0" />
                    <img src={ELIPSE2} alt="elipse2" className="w-full h-full absolute object-cover z-10" />
                    <img src={DENTISTA} alt="dentista" className="w-full h-full absolute object-contain z-20" />
                    <img src={ICONOS} alt="iconos" className="w-full h-full absolute object-contain z-30" />
                    <div className='absolute bg-gradient-to-t from-white from-5% to-accent to-20% w-full h-full z-40 flex flex-col justify-center items-center'></div>
                </div>
            </motion.div>

            {/* Textos animados */}
            <motion.div
                className='flex-1 flex items-center justify-center gap-3 flex-col text-center'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold">¡Prepárate para tu mejor experiencia dental!</h2>
                <p className='text-normal'>
                    Usamos solo los materiales de la mejor calidad del mercado para ofrecer los mejores tratamientos a nuestros pacientes.
                </p>
                <p className='text-normal'>
                    Así que no te preocupes por nada y reserva tu cita.
                </p>
            </motion.div>

            {/* Botón emergencias */}
            <motion.div
                className='flex items-center gap-4 flex-col mt-5 w-full'
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Tooltip text="Copiar contacto" position="top">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className='flex items-center gap-4 transition-transform border border-primary duration-300 ease-in-out rounded-2xl px-4 py-3 shadow-xs shadow-primary relative w-full max-w-md'
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
            <motion.article
                className='flex flex-col gap-4 p-4 rounded-2xl shadow-md shadow-gray-900 relative max-w-md w-full'
                key={'article-presentacion'}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
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
            </motion.article>
        </motion.section>
    );
}
