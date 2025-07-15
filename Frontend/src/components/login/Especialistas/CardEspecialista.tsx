import { FaLinkedin } from "react-icons/fa";
import type { Especialista } from "@/types";
import { useOpenWithTransition } from "@/hooks/general/useOpenWithTransition";
import Modal from "@/components/General/Modal";
import ModalEditarEspecialista from "./ModalEditarEspecialista";
import { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";
import { EspecialistasContext } from "@/context/Especialistas";

export default function EspecialistasCard({ especialistas }: { especialistas: Especialista[] }) {
    const { isOpen, toggle } = useOpenWithTransition();
    const { setEspecialistas } = useContext(EspecialistasContext);
    const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState<Especialista | null>(null);


    const handleOpen = (especialista: Especialista) => {
        setEspecialistaSeleccionado(especialista);
        toggle(); // abre el modal
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEspecialistaSeleccionado((prev) =>
            prev ? { ...prev, [name]: value } : null
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (especialistaSeleccionado) {
            toggle(); // cierra el modal
        }
    };

    const handleDelete = async (id: string) => {


        toast("Estas seguro de eliminar este especialista", {
            action: {
                label: "Eliminar",
                onClick: async () => {

                    const response = await fetch(`${import.meta.env.VITE_API_URL}/especialistas/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Error al eliminar el especialista");
                    }

                    const { success, message } = await response.json();

                    if (success) {
                        toast.success(message);
                        setEspecialistas(especialistas.filter((esp) => esp.id !== id));
                    } else {
                        toast.error(message);
                    }
                },
            },

            cancel: {
                label: "Cancelar",
                onClick: () => {
                    toast.dismiss();
                },
            },
        })


    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={toggle} clases="max-w-3/4" >
                <ModalEditarEspecialista toggle={toggle} especialistaSeleccionado={especialistaSeleccionado} handleChange={handleChange} handleSubmit={handleSubmit} />
            </Modal>

            {/* Tarjetas */}
            {
                especialistas.length === 0 ? (
                    <div className="flex justify-center items-center h-full  w-full py-10">
                        <p className="text-gray-500 text-2xl">No hay especialistas disponibles</p>
                    </div>
                ) : (

                    <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                        {especialistas.map((esp) => (
                            <li
                                key={esp.id}
                                onClick={() => handleOpen(esp)}
                                className="relative group rounded-2xl overflow-hidden shadow-lg min-h-[400px] cursor-pointer"
                            >
                                {/* Imagen de fondo */}
                                <img
                                    src={esp.avatar}
                                    alt={`${esp.nombre} ${esp.apellido}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Overlay oscuro */}
                                <div className="absolute inset-0 bg-black/30" />

                                {/* Contenido inferior */}
                                <div className="absolute bottom-0 w-full bg-primary text-white px-4 py-4 z-10">
                                    <div className="flex flex-col gap-1 text-sm">
                                        <p>
                                            <span className="font-semibold">Nombre completo:</span>{" "}
                                            {esp.nombre} {esp.apellido}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Servicio:</span> {esp.servicio}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Correo:</span> {esp.email}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Teléfono:</span> {esp.telefono}
                                        </p>
                                    </div>
                                </div>

                                {/* Botón de LinkedIn */}
                                <a
                                    href={esp.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="absolute top-4 right-16 bg-white rounded-full shadow-md p-2 hover:bg-blue-600 hover:text-white transition"
                                >
                                    <FaLinkedin className="text-xl" />
                                </a>


                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(esp.id);
                                    }}
                                    className="absolute top-4 right-4 bg-white rounded-full shadow-md p-2 hover:bg-red-600 hover:text-white transition"
                                >
                                    <FaTrash className="text-xl" />
                                </button>
                            </li>
                        ))}
                    </ul >
                )
            }
        </>
    );
}
