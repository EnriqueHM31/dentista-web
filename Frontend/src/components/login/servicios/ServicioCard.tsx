import { type ServicioCardProps } from "@/types/Servicios/types";
import { formatoHoraMinuto } from "@/utils/Hora";
import { FiEdit, FiTrash } from "react-icons/fi";



export default function ServicioCard({ servicio, handleEdit, handleEliminarServicio, handleClickActivarModalIndependiente }: ServicioCardProps) {
    return (
        <li
            key={servicio.id}
            className="flex gap-6 md:gap-3 justify-between bg-primary text-white px-4 py-4 rounded-lg"
        >
            <div className="flex items-center gap-3">
                <img src={servicio.img} alt={servicio.titulo} className="w-10 h-10 object-cover rounded-full" />
                <div>
                    <h3 className="font-bold">{servicio.titulo}</h3>
                    <p className="text-sm text-white/70">Tiempo de duracion por cita aproximado: {formatoHoraMinuto([servicio.duration.toString()])}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-7 md:gap-5">
                <button
                    className="cursor-pointer hover:text-white/80"
                    onClick={() => {
                        handleEdit(servicio)
                        handleClickActivarModalIndependiente("editar_servicio");
                    }}
                >
                    <FiEdit />
                </button>

                <button className="cursor-pointer hover:text-white/80"
                    onClick={() => {
                        handleEliminarServicio(servicio?.id)
                    }}
                >
                    <FiTrash />
                </button>
            </div>
        </li>
    )
}