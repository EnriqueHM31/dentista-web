import { useContext } from "react";
import { ComentariosContext } from "@/context/Comentarios";
import useVisibleComentarios from "@/hooks/admin/Comentarios/VisibleComentarios";
import ComentariosCard from "../Comentarios/ComentariosCard";
import Filtros from "../Comentarios/Filtros";

export default function Comentarios() {
    const { comentarios } = useContext(ComentariosContext);

    const { seleccionados, toggleCheck, guardarSeleccion } = useVisibleComentarios({ comentarios });

    return (
        <div className="max-w-full mx-auto md:p-4 px-0 flex flex-col gap-4  min-h-screen">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
                <h2 className="text-2xl font-bold text-center md:text-left">Comentarios de los clientes</h2>
                <div className="flex justify-end">
                    <button
                        onClick={guardarSeleccion}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                    >
                        Guardar selección
                    </button>

                </div>
            </div>
            <Filtros />
            <div>
                <ComentariosCard comentarios={comentarios} toggleCheck={toggleCheck} seleccionados={seleccionados} />
            </div>



        </div>
    );
}
