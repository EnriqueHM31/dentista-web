import { useEspecialistasContext } from "@/context/Especialistas"
import EspecialistasCard from "../Especialistas/CardEspecialista"
import Modal from "@/components/General/Modal"
import ModalEditarEspecialista from "../Especialistas/ModalEditarEspecialista"
import { useEspecialistas } from "@/hooks/admin/Especialistas/useEspecialistas"
import ModalCrearEspecialista from "../Especialistas/ModalCrearEspecialista"
import { useModalIndependiente } from "@/hooks/general/useModalIndependiente"
import { useServicioContext } from "@/context/Servicio"
import { toast } from "sonner"

export default function Especialistas() {


    const { especialistas } = useEspecialistasContext();


    const { handleClickActivarModalIndependiente, handleClickDesactivarModal, activeModal } = useModalIndependiente();

    const {
        handleOpen, handleChange, handleEditarEspecialista, handleDelete, especialistaSeleccionado, handleCrearEspecialista, handleDescartarCambiosEditarEspecialista, handleChangeCrearEspecialista, handleDescartarCambiosCrearEspecialista }
        = useEspecialistas({ especialistas, toggle: handleClickActivarModalIndependiente, handleClickDesactivarModal });

    const { serviciosDisponibles } = useServicioContext();



    return (
        <>
            <Modal
                activeId={'editar_especialista'}
                modalId={activeModal as string}
                onClose={handleDescartarCambiosEditarEspecialista}
                clases="max-w-11/12 md:max-w-3/4" >
                <ModalEditarEspecialista
                    toggle={handleDescartarCambiosEditarEspecialista}
                    especialistaSeleccionado={especialistaSeleccionado}
                    handleChange={handleChange}
                    handleEditarEspecialista={handleEditarEspecialista} />
            </Modal>

            <Modal
                activeId={'crear_especialista'}
                modalId={activeModal as string}
                onClose={handleDescartarCambiosCrearEspecialista}
                clases="max-w-11/12 md:max-w-1/2" >
                <ModalCrearEspecialista
                    handleClickDesactivarModal={handleDescartarCambiosCrearEspecialista}
                    handleChangeCrearEspecialista={handleChangeCrearEspecialista}
                    handleCrearEspecialista={handleCrearEspecialista} />
            </Modal>



            <div className="max-w-full mx-auto md:p-4 py-4 px-0 flex flex-col gap-4 ">
                <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
                    <h2 className="text-2xl font-bold text-center md:text-left">Especialistas</h2>
                    <div className="flex justify-end">
                        <button
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition cursor-pointer"
                            onClick={() => {
                                if (serviciosDisponibles.length === 0) {
                                    toast.error("No puedes crear un especialista sin servicios disponibles");
                                    return;
                                }
                                handleOpen(undefined, 'crear_especialista');
                            }}
                        >
                            Crear nuevo especialista
                        </button>
                    </div>
                </div>


                {especialistas.length === 0 ? (
                    <div className="flex justify-center items-center h-full  w-full py-10">
                        <p className="text-gray-500 md:text-2xl">No hay especialistas disponibles</p>
                    </div>
                ) : (

                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 ">
                        {especialistas.map((especialista) => (
                            <EspecialistasCard key={especialista.id} handleOpen={handleOpen} handleDelete={handleDelete} especialista={especialista} />

                        ))}
                    </ul >
                )}


            </div >
        </>
    )
}
