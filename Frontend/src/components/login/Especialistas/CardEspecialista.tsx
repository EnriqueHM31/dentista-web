import { FaLinkedin } from "react-icons/fa";
import type { Especialista } from "@/types";
import { useOpenWithTransition } from "@/hooks/general/useOpenWithTransition";
import Modal from "@/components/General/Modal";
import ModalEditarEspecialista from "./ModalEditarEspecialista";
import { FaTrash } from "react-icons/fa6";
import { useEspecialistas } from "@/hooks/admin/Especialistas/useEspecialistas";

export default function EspecialistasCard({ especialistas }: { especialistas: Especialista[] }) {
    const { isOpen, toggle } = useOpenWithTransition();
    const { handleOpen, handleChange, handleSubmit, handleDelete, especialistaSeleccionado } = useEspecialistas({ especialistas, toggle });

    return (
        <>
            <Modal isOpen={isOpen} onClose={toggle} clases="max-w-11/12 md:max-w-3/4" >
                <ModalEditarEspecialista toggle={toggle} especialistaSeleccionado={especialistaSeleccionado} handleChange={handleChange} handleSubmit={handleSubmit} />
            </Modal>

            {/* Tarjetas */}
            {
                especialistas.length === 0 ? (
                    <div className="flex justify-center items-center h-full  w-full py-10">
                        <p className="text-gray-500 md:text-2xl">No hay especialistas disponibles</p>
                    </div>
                ) : (

                    <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                        {especialistas.map((especialista) => (



                            <li onClick={() => handleOpen(especialista)} key={especialista.id} className="bg-primary rounded-2xl px-4 md:py-8 py-4 text-white dark:bg-gray-950 min-h-[300px] flex flex-col justify-center relative">
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
                                        handleDelete(especialista.id)
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

                        ))}
                    </ul >
                )
            }
        </>
    );
}
