import { motion } from "framer-motion";
import type { ModalServicioProps } from "@/types";

export default function ModalServicio({ servicio }: ModalServicioProps) {
    return (
        <article className="flex flex-col md:flex-row items-stretch w-full bg-white md:gap-6 min-h-[50vh] rounded-xl overflow-hidden shadow-lg">
            {/* Imagen */}
            <div className="flex-1 md:min-h-[300px] min-h-[200px] h-full bg-blue-300">
                <motion.img
                    layoutId={`image-${servicio.id}`}
                    src={servicio.img}
                    alt={servicio.titulo}
                    className="w-full h-full object-cover   z-[100] min-h-[200px] md:min-h-[300px]"
                    style={{ viewTransitionName: `servicio-img-${servicio.id}` }}
                    draggable={false}
                />
            </div>

            {/* Texto */}
            <div className="flex-1 flex flex-col justify-center gap-4 py-4 md:py-12 px-4 md:px-9 ">
                <h2 className="text-2xl font-bold">{servicio.titulo}</h2>
                <p>{servicio.descripcion}</p>
            </div>
        </article>
    );
}
