import type { ModalCrearPreguntaProps } from "@/types/Preguntas/types";

export default function ModalCrearPregunta({ toggle, handleCrearPregunta, preguntaForm, handleCambiarCampoPregunta }: ModalCrearPreguntaProps) {

    return (
        <form onSubmit={async (e) => {
            await handleCrearPregunta(e);
        }} className="w-full p-6 flex flex-col gap-4 bg-primary">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-4">Agregar una nueva pregunta</h3>

            <div className="mb-4 flex flex-col gap-4">
                <label htmlFor="pregunta" className="block text-sm font-medium px-3 py-1 md:py-2 rounded-xl bg-white text-primary w-fit mb-1">
                    Pregunta
                </label>
                <input
                    id="pregunta"
                    type="text"
                    name="pregunta"
                    value={preguntaForm.pregunta}
                    onChange={(e) => handleCambiarCampoPregunta(e)}
                    className="w-full border rounded px-3 py-2 border-white text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
            </div>

            <div className="mb-4 flex flex-col gap-4">
                <label htmlFor="respuesta" className="block text-sm font-medium px-3 py-1 md:py-2 rounded-xl bg-white text-primary w-fit mb-1">
                    Respuesta
                </label>
                <textarea
                    id="respuesta"
                    name="respuesta"
                    value={preguntaForm.respuesta}
                    onChange={(e) => handleCambiarCampoPregunta(e)}
                    className="w-full border rounded px-3 py-2 border-white text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none scrollbar-hide"
                    rows={5}
                    required
                />
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={toggle}
                    className="px-4 py-2  rounded text-white bg-red-600 cursor-pointer hover:bg-red-400"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-800 transition cursor-pointer"
                >
                    Crear
                </button>
            </div>
        </form>
    )
}