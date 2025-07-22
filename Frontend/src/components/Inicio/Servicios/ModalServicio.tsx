import { motion } from "framer-motion";
import type { ModalServicioProps } from "@/types";

export default function ModalServicio({ servicio }: ModalServicioProps) {
    return (
        <article className="flex flex-col md:flex-row w-full bg-white md:gap-6 rounded-xl overflow-hidden shadow-lg min-h-[60vh]">
            {/* Imagen */}
            <div className="flex-1 h-[300px] md:h-auto md:min-h-[60vh]">
                <motion.img
                    layoutId={`image-${servicio.id}`}
                    src={servicio.img}
                    alt={servicio.titulo}
                    className="w-full h-full object-cover"
                    style={{ viewTransitionName: `servicio-img-${servicio.id}` }}
                    draggable={false}
                />
            </div>

            {/* Texto */}
            <div className="flex-1 flex flex-col justify-center gap-4 py-6 md:py-12 px-4 md:px-9">
                <h2 className="text-2xl font-bold">{servicio.titulo}</h2>
                <p>{servicio.descripcion}</p>
            </div>
        </article>

    );
}
