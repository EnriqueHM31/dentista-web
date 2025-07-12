import Modal from "@/components/general/Modal";
import { useOpenWithTransition } from "@/hooks/general/useOpen";
import ModalDatos from "../ModalDatos";
import CalendarioCitas from "../Calendario";
import 'rsuite/Calendar/styles/index.css';



export default function Perfil() {

    const { isOpen, toggle } = useOpenWithTransition()
    return (
        <section className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between ">
                <h1 className="text-3xl font-semibold capitalize ">Perfil</h1>
                <button className="bg-primary text-white  py-2 px-5 text-[15px] font-medium tracking-wide rounded-md hover:bg-primary/90 focus:outline-none cursor-pointer w-fit" onClick={toggle}>
                    Editar datos
                </button>
            </div>

            <CalendarioCitas />

            <Modal isOpen={isOpen} onClose={toggle} clases="max-w-1/3 flex items-center justify-center">
                <ModalDatos toggle={toggle} />
            </Modal>

        </section>
    )
}