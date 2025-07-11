import Modal from "@/components/general/Modal";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { useGetServicios } from "@/hooks/admin/Servicios/useGetServicios";
import ModalEditarServicio from "../servicios/ModalEditarServicio";
import type { Servicio } from "@/types";
import { useModalEditarServicio } from "@/hooks/admin/Servicios/useModalEditarServicio";
import { toast } from "sonner";
import { useModalIndependiente } from "@/hooks/general/useModalIndependiente";
import ModalCrearServicio from "../servicios/ModalCrearServicio";


export default function Servicios() {

    const { handleClickActivarModalIndependiente, activeModal, handleClickDesactivarModal } = useModalIndependiente();
    const { servicios, serviciosRef, refrescarUpdateServicio, handleSubmitCrearServicio, handleEliminarServicio } = useGetServicios({ handleClickDesactivarModal });
    const { formValues, handleEdit, handleChange, formularioOriginal } = useModalEditarServicio();

    const handledescartarCambios = () => {
        const sonIguales = (Object.keys(formValues) as (keyof Servicio)[]).every((key) => {
            return formValues[key] === formularioOriginal.current[key];
        });

        if (sonIguales) {
            handleClickDesactivarModal();
        } else {
            toast("Estas seguro de deshacer los cambios?", {
                action: {
                    label: "Deshacer",
                    onClick: () => {
                        handleClickDesactivarModal();
                    }
                },
                cancel: {
                    label: "Cancelar",
                    onClick: () => {
                        toast.dismiss();
                    }
                },
            });
        }
    };


    return (
        <>
            <Modal onClose={handledescartarCambios} modalId="editar_servicio" activeId={activeModal} clases="max-w-2/3 w-full">
                <ModalEditarServicio serviciosRef={serviciosRef} handleClickDesactivarModal={handleClickDesactivarModal} formValues={formValues} handleChange={handleChange} refresh={refrescarUpdateServicio} />
            </Modal>

            <Modal onClose={handledescartarCambios} modalId="crear_servicio" activeId={activeModal} clases="max-w-2/3 w-full">
                <ModalCrearServicio handleClickDesactivarModal={handleClickDesactivarModal} handleSubmitCrearServicio={handleSubmitCrearServicio} />
            </Modal>


            <section className="flex flex-col gap-6 p-4">
                <div className="flex justify-between items-center mb-6">
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
                            className="flex gap-3 justify-between bg-primary text-white px-4 py-2 rounded-lg"
                        >
                            <h3>{servicio.name}</h3>
                            <div className="flex gap-5">
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
