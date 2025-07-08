import { useOpenWithTransition } from "@/hooks/general/useOpenWithTransition";
import { motion } from "framer-motion";
import Modal from "@/components/general/Modal";
import ModalServicio from "./ModalServicio";
import type { CardServicioProps } from "@/types";

export default function CardServicio({ servicio, index }: CardServicioProps) {
    const { isOpen, open, close } = useOpenWithTransition();

    return (
        <>
            {/* Modal padre */}
            <Modal
                isOpen={isOpen}
                onClose={close}
                clases="max-w-11/12 xl:max-w-3/4 w-full rounded-2xl overflow-x-hidden"
            >
                <ModalServicio servicio={servicio} />
            </Modal>

            {/* Tarjeta */}
            <motion.article
                key={servicio.name}
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="group rounded-xl bg-white shadow-secondary-1 dark:bg-surface-dark border border-black/10 flex flex-col hover:bg-secondary transition duration-500 ease-out cursor-pointer"
                onClick={open}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        open();
                    }
                }}
            >
                <div
                    className="relative overflow-hidden bg-cover bg-no-repeat flex-2"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                >
                    <motion.img
                        layoutId={`image-${servicio.id}`}
                        className="rounded-t-lg w-full group-hover:scale-110 transition-transform duration-100 linear z-100"
                        src={servicio.img}
                        alt={servicio.name}
                        style={{ viewTransitionName: `servicio-img-${servicio.id}` }}
                        draggable={false}
                    />
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                    <h5 className="mb-2 text-xl leading-tight text-primary font-bold group-hover:text-white">
                        {servicio.name}
                    </h5>
                    <p className="mb-4 text-base text-black group-hover:text-white/50 line-clamp-2">
                        {servicio.description}
                    </p>

                    <button
                        aria-label={`Leer más sobre ${servicio.name}`}
                        disabled={isOpen}
                        type="button"
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong text-center hover:bg-white/80 transition duration-300 group-hover:bg-white group-hover:text-primary cursor-pointer"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                    >
                        Leer más
                    </button>
                </div>
            </motion.article>
        </>
    );
}
