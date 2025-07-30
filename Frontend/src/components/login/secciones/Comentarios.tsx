import Testimonio from "@/components/Inicio/Comentarios/Testimonio";
import { useComentariosContext } from "@/context/Comentarios";
import useVisibleComentarios from "@/hooks/admin/Comentarios/VisibleComentarios";
import Filtros from "../Comentarios/Filtros";

export default function Comentarios() {
    const { comentarios } = useComentariosContext();
    const { seleccionados, toggleCheck, guardarSeleccion, limpiarSeleccion, cantidadComentariosModificados, comentarioModificado } = useVisibleComentarios({ comentarios });

    const comentariosModificados = cantidadComentariosModificados();

    return (
        <section className="max-w-full mx-auto md:p-4 px-0 flex flex-col gap-4 min-h-screen">
            <header className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center">
                <h2 className="text-2xl font-bold text-center md:text-left">
                    Comentarios de los clientes
                </h2>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={limpiarSeleccion}
                        className="bg-red-500 hover:bg-red-800 cursor-pointer text-white px-6 py-2 rounded-lg  transition"
                    >
                        Limpiar selección
                    </button>

                    <button
                        onClick={guardarSeleccion}
                        className="bg-blue-500 hover:bg-blue-800 cursor-pointer text-white px-6 py-2 rounded-lg  transition"
                    >
                        Guardar selección
                    </button>

                </div>
            </header>

            {
                comentariosModificados > 0 && (
                    <div className="fixed bottom-1/12 right-20 size-14 flex flex-col gap-4 items-center justify-center bg-green-500 text-white rounded-full z-80">
                        <h2 className="text-2xl font-bold">
                            {comentariosModificados}
                        </h2>
                    </div>
                )
            }

            <Filtros />

            {comentarios.length > 0 ? (
                <div className={`grid gap-8 mt-4 ${comentarios.length === 1
                    ? "grid-cols-[400px]"
                    : "grid-cols-[repeat(auto-fit,minmax(350px,1fr))]"
                    }`}>
                    {comentarios.map((comentario) => (
                        <Testimonio
                            comentario={comentario}
                            checked={seleccionados[comentario.id]}
                            key={comentario.id}
                            onCheckToggle={toggleCheck}
                            comentarioModificado={comentarioModificado(comentario.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4 items-center justify-center">
                    <h2 className="text-2xl font-bold">No hay comentarios</h2>
                </div>
            )
            }
        </section>
    );
}
