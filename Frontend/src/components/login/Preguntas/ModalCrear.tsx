import { useCrearPregunta } from "@/hooks/admin/useCrearPregunta";
import type { ModalCrearProps } from "@/types";

export default function ModalCrear({ toggle, handleCrearNuevaPregunta }: ModalCrearProps) {

    const { handleCrearPregunta, preguntaForm, handleCambiarPregunta, handleCambiarRespuesta } = useCrearPregunta();

    return (
        <form onSubmit={async (e) => {
            await handleCrearPregunta(e);
            await handleCrearNuevaPregunta();
        }} className="w-full p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Agregar nueva pregunta</h2>

            <div className="mb-4">
                <label htmlFor="pregunta" className="block text-sm font-medium text-gray-700 mb-1">
                    Pregunta
                </label>
                <input
                    id="pregunta"
                    type="text"
                    value={preguntaForm.pregunta}
                    onChange={(e) => handleCambiarPregunta(e)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="respuesta" className="block text-sm font-medium text-gray-700 mb-1">
                    Respuesta
                </label>
                <textarea
                    id="respuesta"
                    value={preguntaForm.respuesta}
                    onChange={(e) => handleCambiarRespuesta(e)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none scrollbar-hide"
                    rows={5}
                    required
                />
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={toggle}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition cursor-pointer"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark transition cursor-pointer"
                >
                    Crear
                </button>
            </div>
        </form>
    )
}