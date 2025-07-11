import Modal from "@/components/general/Modal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useOpenWithTransition } from "@/hooks/general/useOpenWithTransition";
import { useGetServicios } from "@/hooks/admin/Servicios/useGetServicios";
import ModalEditarServicio from "../servicios/ModalEditarServicio";
import type { Servicio } from "@/types";
import { useModalEditarServicio } from "@/hooks/admin/Servicios/useModalEditarServicio";
import { toast } from "sonner";


export default function Servicios() {
    const { isOpen, toggle } = useOpenWithTransition();
    const { servicios, serviciosRef, refrescarUpdateServicio, handleEliminarServicio } = useGetServicios();
    const { formValues, handleEdit, handleChange, formularioOriginal } = useModalEditarServicio();

    const handledescartarCambios = () => {
        const sonIguales = (Object.keys(formValues) as (keyof Servicio)[]).every((key) => {
            return formValues[key] === formularioOriginal.current[key];
        });

        if (sonIguales) {
            toggle();
        } else {
            toast("Estas seguro de deshacer los cambios?", {
                action: {
                    label: "Deshacer",
                    onClick: () => {
                        toggle();
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
            <Modal isOpen={isOpen} onClose={handledescartarCambios} clases="max-w-3/4 w-full">
                <ModalEditarServicio serviciosRef={serviciosRef} toggle={toggle} formValues={formValues} handleChange={handleChange} refresh={refrescarUpdateServicio} />
            </Modal>


            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-primary">Servicios</h2>

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
                                        toggle();
                                    }}
                                >
                                    <FiEdit />
                                </button>

                                <button className="cursor-pointer hover:text-white/80"
                                    onClick={() => {
                                        handleEliminarServicio(servicio.id);
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
