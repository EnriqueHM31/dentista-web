import { useContext } from "react";
import { ComentariosContext } from "@/context/Comentarios";
import Testimonio from "@/components/Inicio/Comentarios/Testimonio";
import useVisibleComentarios from "@/hooks/admin/Comentarios/VisibleComentarios";

export default function Comentarios() {
    const { comentarios } = useContext(ComentariosContext);

    const { seleccionados, toggleCheck, guardarSeleccion } = useVisibleComentarios({ comentarios });

    return (
        <div className="max-w-full mx-auto md:p-4 px-0 flex flex-col gap-4 ">
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
            {
                comentarios.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                        {comentarios.map(({ id, nombre, mensaje, ranking, visible }, index) => (
                            <Testimonio
                                id={id}
                                key={id}
                                client_name={nombre}
                                comment={mensaje}
                                rating={ranking}
                                index={index}
                                visible={visible} // Este valor viene del contexto
                                checked={!!seleccionados[id]} // Estado local controlado
                                onCheckToggle={toggleCheck}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <h2 className="text-2xl font-bold">No hay comentarios</h2>
                    </div>
                )
            }



        </div>
    );
}
