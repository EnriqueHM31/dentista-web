import type { ModalEditarProps } from "@/types";



export default function ModalEditar({ handleEditarPregunta, handleEditarRespuesta, preguntaSeleccionada, toggle, handleGuardar }: ModalEditarProps) {


    return (
        <section className="bg-primary text-white rounded-lg shadow p-6 w-full max-w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Editar pregunta</h3>
            <form className="flex flex-col gap-8" onSubmit={(e) => handleGuardar(e)}>
                <div className="flex flex-col gap-6">
                    <label htmlFor="preguntaSeleccionada" className="text-sm font-semibold px-4 py-2 bg-white text-primary rounded-xl w-fit">Pregunta</label>
                    <input
                        id="preguntaSeleccionada"
                        type="text"
                        value={preguntaSeleccionada?.pregunta || ""}
                        onChange={(e) => handleEditarPregunta(e)}
                        className="w-full border border-gray-500 focus:outline-gray-800  px-3 py-2 rounded"
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <label htmlFor="respuestaSeleccionada" className="text-sm font-semibold px-4 py-2 bg-white text-primary rounded-xl w-fit">Respuesta</label>
                    <textarea
                        id="respuestaSeleccionada"
                        rows={10}
                        value={preguntaSeleccionada?.respuesta || ""}
                        onChange={(e) => handleEditarRespuesta(e)}
                        className="w-full border border-gray-500 focus:outline-gray-800  px-3 py-2 rounded resize-none scrollbar-invisible"
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