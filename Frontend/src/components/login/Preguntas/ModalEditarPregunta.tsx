import type { ModalEditarPreguntaProps } from "@/types/Preguntas/types";



export default function ModalEditarPregunta({ preguntaSeleccionada, toggle, handleEditarCampoPregunta, handleEditarPregunta }: ModalEditarPreguntaProps) {


    return (
        <section className="bg-primary text-white rounded-lg shadow p-6 w-full max-w-full scrollbar-invisible">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-4">Editar pregunta</h3>
            <form className="flex flex-col gap-8" onSubmit={(e) => handleEditarPregunta(e)}>
                <div className="flex flex-col gap-6">
                    <label htmlFor="preguntaSeleccionada" className="text-sm font-semibold px-4 py-1 md:py-2 bg-white text-primary rounded-xl w-fit">Pregunta</label>
                    <input
                        id="preguntaSeleccionada"
                        type="text"
                        name="pregunta"
                        value={preguntaSeleccionada?.pregunta || ""}
                        onChange={(e) => handleEditarCampoPregunta(e)}
                        className="w-full border text-sm md:text-base border-gray-500 focus:outline-gray-800  px-3 py-2 rounded"
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <label htmlFor="respuestaSeleccionada" className="text-sm font-semibold px-4 py-1 md:py-2 bg-white text-primary rounded-xl w-fit">Respuesta</label>
                    <textarea
                        id="respuestaSeleccionada"
                        rows={10}
                        name="respuesta"
                        value={preguntaSeleccionada?.respuesta || ""}
                        onChange={(e) => handleEditarCampoPregunta(e)}
                        className="w-full border text-sm md:text-base border-gray-500 fo    us:outline-gray-800  px-3 py-2 rounded resize-none scrollbar-invisible "
                    />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={toggle}
                        className="px-4 py-2  rounded text-white bg-red-600 cursor-pointer hover:bg-red-400"
                    >
                        Cancelar
                    </button>
                    <button

                        type="submit"
                        className="px-4 py-2 text-primary  rounded cursor-pointer bg-white hover:bg-white/80"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </section>
    )
}