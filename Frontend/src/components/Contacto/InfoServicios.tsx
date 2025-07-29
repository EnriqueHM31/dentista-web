import type { ServicioProps } from "@/types/Servicios/types";
import { formatoHoraMinutoSingle } from "@/utils/Hora";

export default function ServicioInfo({ servicios }: { servicios: ServicioProps[] }) {
    return (

        <section className="flex flex-col gap-4 md:gap-10 justify-between items-center p-8 ">
            <h2 className="text-2xl font-bold text-center md:text-left">Informacion de la duración de las citas</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-6  w-full">

                {
                    servicios.map(({ titulo, img, duration }) => (
                        <div className="group border rounded-lg shadow-md border-primary overflow-hidden flex gap-4 p-4 hover:bg-primary hover:text-white transition duration-300 ease-in" key={titulo}>
                            <img
                                src={img}
                                alt={titulo}
                                className="w-32 h-32 object-cover rounded-md flex-shrink-0"
                            />
                            <div className="flex flex-col justify-center">
                                <h3 className="text-lg font-semibold">{titulo}</h3>
                                <p className=" font-bold text-md">
                                    Duración de la cita aproximada:
                                </p>
                                <p className=" font-bold text-md bg-primary text-white px-3 w-fit py-1 rounded-md mt-1 group-hover:bg-white group-hover:text-primary transition duration-300 ease-in">
                                    {formatoHoraMinutoSingle(duration.toString())}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};
