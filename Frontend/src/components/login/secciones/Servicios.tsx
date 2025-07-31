import Modal from "@/components/General/Modal";
import { useGetServicios } from "@/hooks/admin/Servicios/useGetServicios";
import { useModalEditarServicio } from "@/hooks/admin/Servicios/useModalEditarServicio";
import { useModalIndependiente } from "@/hooks/general/useModalIndependiente";
import { FiPlus } from "react-icons/fi";
import ModalCrearServicio from "../Servicios/ModalCrearServicio";
import ModalEditarServicio from "../Servicios/ModalEditarServicio";
import ServicioCard from "../Servicios/ServicioCard";


export default function Servicios() {

    const { handleClickActivarModalIndependiente, activeModal, handleClickDesactivarModal } = useModalIndependiente();

    const { servicios, serviciosRef, handleSubmitCrearServicio, handleEliminarServicio, handledescartarCambiosCrearServicio, handleCambiarCampoServicio, servicioCrear } = useGetServicios({ handleClickDesactivarModal });

    const { formValues, handleEdit, handleChange, handledescartarCambios } = useModalEditarServicio();

    return (
        <>
            <Modal onClose={() => handledescartarCambios(handleClickDesactivarModal)} modalId="editar_servicio" activeId={activeModal as string} clases="md:max-w-2/3 max-w-11/12 w-full">
                <ModalEditarServicio
                    serviciosRef={serviciosRef}
                    handleClickDesactivarModal={handleClickDesactivarModal}
                    formValues={formValues}
                    handleChange={handleChange} />
            </Modal>

            <Modal onClose={() => handledescartarCambiosCrearServicio(handleClickDesactivarModal)} modalId="crear_servicio" activeId={activeModal as string} clases="md:max-w-2/3 max-w-11/12 w-full">
                <ModalCrearServicio
                    handleClickDesactivarModal={handleClickDesactivarModal}
                    handleSubmitCrearServicio={handleSubmitCrearServicio}
                    handledescartarCambiosCrearServicio={handledescartarCambiosCrearServicio}
                    handleCambiarCampoServicio={handleCambiarCampoServicio}
                    servicioCrear={servicioCrear}
                />
            </Modal>


            <section className="flex flex-col gap-6 md:p-4">
                <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
                    <h2 className="text-3xl font-semibold capitalize ">Servicios</h2>
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
                        <ServicioCard key={servicio.id} servicio={servicio} handleEdit={handleEdit} handleEliminarServicio={handleEliminarServicio} handleClickActivarModalIndependiente={handleClickActivarModalIndependiente} />
                    ))}
                </ul>
            </section>
        </>
    );
}
