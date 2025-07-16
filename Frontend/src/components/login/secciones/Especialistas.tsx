import { EspecialistasContext } from "@/context/Especialistas"
import { useContext } from "react"
import EspecialistasCard from "../Especialistas/CardEspecialista"

export default function Especialistas() {


    const { especialistas } = useContext(EspecialistasContext)
    return (
        <div className="max-w-full mx-auto p-4 flex flex-col gap-4 mt-10 md:mt-0">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
                <h2 className="text-2xl font-bold">Comentarios de los clientes</h2>
                <div className="flex justify-end">
                    <button
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                    >
                        Crear nuevo especialista
                    </button>
                </div>
            </div>


            <EspecialistasCard especialistas={especialistas} />
        </div >
    )
}
