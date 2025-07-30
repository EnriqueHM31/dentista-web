import HERO from '@/assets/hero/hero.png';
import { motion } from "framer-motion";


export default function ImagenAnimada() {
    return (
        <motion.div
            className="absolute -z-10 w-full h-full bottom-0 left-1/2 xl:left-3/4 -translate-x-1/2 flex xl:items-center items-end xl:justify-center xl:flex-1 "
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <img src={HERO} alt="hero" className="w-full h-1/3 xl:h-11/12 object-contain -z-40" />
        </motion.div>
    );
}