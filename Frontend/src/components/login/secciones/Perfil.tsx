import Modal from "@/components/General/Modal";
import { useOpenWithTransition } from "@/hooks/general/useOpen";
import CalendarioCitas from "../Usuario/Calendario";
import ModalDatos from "../Usuario/ModalDatos";



export default function Perfil() {

    const { isOpen, toggle } = useOpenWithTransition()
    return (
        <section className="flex flex-col gap-4 w-full p-4">
            <div className="flex items-center justify-between ">
                <h2 className="text-3xl font-semibold capitalize ">Perfil</h2>
                <button className="bg-primary text-white  py-2 px-5 font-medium tracking-wide rounded hover:bg-primary/90 focus:outline-none cursor-pointer w-fit" onClick={toggle}>
                    Editar datos
                </button>
            </div>

            <CalendarioCitas />

            <Modal isOpen={isOpen} onClose={toggle} clases="max-w-11/12 md:max-w-1/3 flex items-center justify-center">
                <ModalDatos toggle={toggle} />
            </Modal>

        </section>
    )
}