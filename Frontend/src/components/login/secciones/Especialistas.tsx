import { EspecialistasContext } from "@/context/Especialistas"
import { useContext } from "react"
import EspecialistasCard from "../Especialistas/CardEspecialista"
import Modal from "@/components/General/Modal"
import ModalEditarEspecialista from "../Especialistas/ModalEditarEspecialista"
import { useEspecialistas } from "@/hooks/admin/Especialistas/useEspecialistas"
import ModalCrearEspecialista from "../Especialistas/ModalCrearEspecialista"
import { useModalIndependiente } from "@/hooks/general/useModalIndependiente"

export default function Especialistas() {


    const { especialistas } = useContext(EspecialistasContext)


    const { handleClickActivarModalIndependiente, handleClickDesactivarModal, activeModal } = useModalIndependiente();

    const { handleOpen, handleChange, handleSubmit, handleDelete, especialistaSeleccionado, handleCrearEspecialista } = useEspecialistas({ especialistas, toggle: handleClickActivarModalIndependiente, handleClickDesactivarModal });

    return (
        <>


            <Modal
                activeId={'editar_especialista'}
                modalId={activeModal as string}
                onClose={handleClickDesactivarModal}
                clases="max-w-11/12 md:max-w-3/4" >
                <ModalEditarEspecialista toggle={handleClickDesactivarModal} especialistaSeleccionado={especialistaSeleccionado} handleChange={handleChange} handleSubmit={handleSubmit} />
            </Modal>

            <Modal
                activeId={'crear_especialista'}
                modalId={activeModal as string}
                onClose={handleClickDesactivarModal}
                clases="max-w-11/12 md:max-w-3/4" >
                <ModalCrearEspecialista handleClickDesactivarModal={handleClickDesactivarModal} handleCrearEspecialista={handleCrearEspecialista} />
            </Modal>



            <div className="max-w-full mx-auto md:p-4 py-4 px-0 flex flex-col gap-4 ">
                <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
                    <h2 className="text-2xl font-bold text-center md:text-left">Especialistas</h2>
                    <div className="flex justify-end">
                        <button
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                            onClick={() => handleOpen(undefined, 'crear_especialista')}
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

                    <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                        {especialistas.map((especialista) => (
                            <EspecialistasCard key={especialista.id} handleOpen={handleOpen} handleDelete={handleDelete} especialista={especialista} />

                        ))}
                    </ul >
                )}


            </div >
        </>
    )
}
