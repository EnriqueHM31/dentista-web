import Modal from "@/components/General/Modal";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { useGetServicios } from "@/hooks/admin/Servicios/useGetServicios";
import ModalEditarServicio from "../Servicios/ModalEditarServicio";
import { useModalEditarServicio } from "@/hooks/admin/Servicios/useModalEditarServicio";
import { useModalIndependiente } from "@/hooks/general/useModalIndependiente";
import ModalCrearServicio from "../Servicios/ModalCrearServicio";
import { formatoHoraMinuto } from "@/utils/Hora";


export default function Servicios() {

    const { handleClickActivarModalIndependiente, activeModal, handleClickDesactivarModal } = useModalIndependiente();
    const { servicios, serviciosRef, refrescarUpdateServicio, handleSubmitCrearServicio, handleEliminarServicio } = useGetServicios({ handleClickDesactivarModal });
    const { formValues, handleEdit, handleChange, handledescartarCambios } = useModalEditarServicio();




    return (
        <>
            <Modal onClose={() => handledescartarCambios(handleClickDesactivarModal)} modalId="editar_servicio" activeId={activeModal as string} clases="md:max-w-2/3 max-w-11/12 w-full">
                <ModalEditarServicio serviciosRef={serviciosRef} handleClickDesactivarModal={handleClickDesactivarModal} formValues={formValues} handleChange={handleChange} refresh={refrescarUpdateServicio} />
            </Modal>

            <Modal onClose={() => handledescartarCambios(handleClickDesactivarModal)} modalId="crear_servicio" activeId={activeModal as string} clases="md:max-w-2/3 max-w-11/12 w-full">
                <ModalCrearServicio handleClickDesactivarModal={handleClickDesactivarModal} handleSubmitCrearServicio={handleSubmitCrearServicio} />
            </Modal>


            <section className="flex flex-col gap-6 md:p-4">
                <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center md:mb-6">
                    <h2 className="text-2xl font-bold">Servicios</h2>
                    <button
                        onClick={() => handleClickActivarModalIndependiente("crear_servicio")}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition cursor-pointer"
                        type="button"
                    >
                        <FiPlus size={18} /> Agregar Servicio
                    </button>
                </div>

                <ul className="grid xl:grid-cols-2 md:grid-cols-1 w-full gap-6">
                    {servicios.map((servicio) => (
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
                                        handleEliminarServicio(servicio.id)
                                    }}
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
