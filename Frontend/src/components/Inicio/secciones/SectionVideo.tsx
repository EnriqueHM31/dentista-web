import { motion } from "framer-motion";
import TituloSeccion from "@/components/Inicio/ui/TituloSeccion";
import VIDEO from "@/assets/videos/seccionvideo.mp4";
import { FaPlay } from "react-icons/fa";
import useVideo from "@/hooks/inicio/useVideo";

export default function SectionVideo() {
    const { isPlaying, handlePlay, handleEnd, videoRef } = useVideo();

    return (
        <motion.section
            className="min-h-screen flex flex-col items-center justify-center max-w-11/12 xl:max-w-10/12 w-full mx-auto py-5 xl:py-20 px-0 md:px-10 lg:px-20 xl:px-10 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <TituloSeccion
                titulo="Estamos aceptando nuevos pacientes y estamos ansiosos por conocerte."
                clases="xl:max-w-3/4 max-w-full text-center"
            />

            <p className="xl:max-w-3/4 max-w-full w-full text-center">
                Utilizamos únicamente los materiales de más alta calidad del mercado
                para ofrecer a nuestros pacientes los mejores tratamientos.
            </p>

            <motion.div className="max-w-full xl:max-w-3/4 w-full relative rounded-2xl mt-10 xl:mt-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <video
                    ref={videoRef}
                    src={VIDEO}
                    className="w-full xl:h-full md:h-60 h-80  object-cover rounded-2xl"
                    onEnded={handleEnd}
                    controls
                />

                {!isPlaying && (
                    <button
                        className="absolute hidden  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white p-4 rounded-full xl:flex items-center justify-center md:size-20 size-10 xl:size-30 bg-primary-foreground"
                        onClick={handlePlay}
                    >
                        <FaPlay className="text-primary" />
                    </button>
                )}
            </motion.div>
        </motion.section>
    );
}
