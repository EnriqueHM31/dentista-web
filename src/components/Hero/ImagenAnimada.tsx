import { motion } from "framer-motion";
import ELIPSE from '@/assets/hero/elipse.webp';
import ELIPSE2 from '@/assets/hero/elipse2.webp';
import DENTISTA from '@/assets/hero/dentista.webp';
import ICONOS from '@/assets/hero/iconos.webp';


export default function ImagenAnimada() {
    return (
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
    );
}