import { FaLinkedin } from "react-icons/fa";
import type { Especialista } from "@/types";
import { FaTrash } from "react-icons/fa6";


interface EspecialistasCardProps {
    handleOpen: (especialista: Especialista, modal: string) => void;
    handleDelete: (especialista: Especialista) => void;
    especialista: Especialista;
}

export default function EspecialistasCard({ handleOpen, handleDelete, especialista }: EspecialistasCardProps) {


    return (
        <>
            <li onClick={() => handleOpen(especialista, 'editar_especialista')} key={especialista.id} className="bg-primary rounded-2xl px-4 md:py-8 py-4 text-white dark:bg-gray-950 min-h-[300px] md:min-h-auto flex flex-col justify-center relative">
                <article className=" flex justify-between  gap-4 flex-col">
                    <div className="flex gap-4 items-center">
                        <img src={especialista.avatar} alt={especialista.nombre} className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold text-white dark:text-gray-50 truncate">
                                {`${especialista.nombre} ${especialista.apellido}`}
                            </p>
                            <p className="text-sm text-white/60 dark:text-gray-200 truncate">{especialista.email}</p>

                        </div>
                    </div>

                    <div>
                        <p className="mb-2"><span className="font-bold text-white/60">Especialista: </span> {especialista.servicio}</p>

                        <p className="mb-2"><span className="font-bold text-white/60">Direccion: </span> {especialista.direccion}</p>

                        <p className="mb-2"><span className="font-bold text-white/60">Telefono: </span> {especialista.telefono}</p>

                    </div>

                    <button onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(especialista)
                    }
                    } className="absolute top-4 text-lg p-2 rounded-full right-5 bg-red-500 hover:bg-red-800 transition-all duration-300">
                        <FaTrash />
                    </button>

                    <a href={especialista.linkedin} onClick={(e) => {
                        e.stopPropagation()
                    }} target="_blank" rel="noopener noreferrer" className="absolute top-4 text-lg p-2 rounded-full right-15 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
                        <FaLinkedin />
                    </a>
                </article>
            </li>

        </>
    );
}
