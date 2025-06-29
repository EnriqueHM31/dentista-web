interface ModalServicioProps {
    servicio: {
        name: string;
        description: string;
        img: string;
    };
}


export default function ModalServicio({ servicio }: ModalServicioProps) {
    return (
        <article className="flex md:flex-row flex-col items-stretch w-full bg-white gap-6 min-h-[50vh]">
            {/* Imagen */}
            <div className="flex-1">
                <img
                    src={servicio.img}
                    alt={servicio.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Texto */}
            <div className="flex-2 flex flex-col justify-center gap-4 py-4 px-7">
                <h2 className="text-2xl font-bold">{servicio.name}</h2>
                <p>{servicio.description}</p>
            </div>
        </article>

    )
}