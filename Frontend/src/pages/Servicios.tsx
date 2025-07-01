
import SERVICIOS_DATA from "@/assets/mooks/servicios.json";
import CardServicio from "@/components/Servicios/CardServicio";
import { motion } from "framer-motion";


export default function Servicios() {


    return (
        <>

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

                        <CardServicio servicio={servicio} index={index} />
                    ))}

                </div>
            </section>

        </>
    )
}