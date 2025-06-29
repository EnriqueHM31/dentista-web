
import SERVICIOS_DATA from "@/assets/mooks/servicios.json";
import Modal from "@/components/general/Modal";
import { useOpen } from "@/hooks/useOpen";
import { motion } from "framer-motion";


export default function Servicios() {

    const { isOpen, toggleMenu } = useOpen()

    return (
        <>

            <Modal isOpen={isOpen} onClose={toggleMenu}>
                <div className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-2xl">
                    <h2 className="text-center text-2xl font-bold text-primary">
                        Servicios
                    </h2>
                    <p className="text-center text-base text-black/50">

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </Modal>
            <section className="bg-white w-full gap-8 mt-20 py-20 md:py-15 xl:py-10 min-h-screen flex justify-center flex-col items-center " id="servicios">

                <motion.h2
                    className="text-center text-3xl font-bold text-primary"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{
                        duration: 0.4,
                        delay: 0.5,
                        ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                >Servicios
                </motion.h2>
                <div className="max-w-11/12 md:max-w-10/12 px-2 xl:px-4 mx-auto w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
                    {SERVICIOS_DATA.map((servicio, index) => (

                        <motion.article
                            key={servicio.name} initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{
                                duration: 0.4,
                                delay: index * 0.1,
                                ease: "easeOut",
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="group rounded-xl bg-white shadow-secondary-1 dark:bg-surface-dark border border-black/10 flex flex-col hover:bg-secondary transition duration-500 ease-out">
                            <div
                                className="relative overflow-hidden bg-cover bg-no-repeat flex-2"
                                data-twe-ripple-init
                                data-twe-ripple-color="light">
                                <img
                                    className="rounded-t-lg w-full group-hover:scale-130 transition duration-300 ease-in-out"
                                    src={servicio.img}
                                    alt={servicio.name} />
                            </div>
                            <div className="p-6 flex flex-col justify-between flex-1  ">
                                <h5 className="mb-2 text-xl leading-tight text-primary font-bold group-hover:text-white">{servicio.name}</h5>
                                <p className="mb-4 text-base text-black group-hover:text-white/50">
                                    {servicio.description}
                                </p>
                                <button
                                    onClick={toggleMenu}
                                    type="button"
                                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong text-center hover:bg-white/80 transition duration-300 group-hover:bg-white group-hover:text-primary cursor-pointer"
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light">
                                    Leer mas
                                </button>
                            </div>
                        </motion.article>
                    ))}

                </div>
            </section>

        </>
    )
}