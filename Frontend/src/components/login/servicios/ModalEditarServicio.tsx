import { Pencil } from "lucide-react";
import { useEditarServicio } from "@/hooks/admin/Servicios/useEditarServicio";
import type { ModalEditarServicioProps } from "@/types";

export default function ModalEditarServicio({ serviciosRef, handleClickDesactivarModal, formValues, handleChange, refresh }: ModalEditarServicioProps) {

    const { preview, handlePreview, handleSubmit } = useEditarServicio({ serviciosRef, formValues, handleClickDesactivarModal });
    return (
        <div className="bg-primary w-full h-[80vh] rounded-lg overflow-hidden shadow-lg flex">
            {/* Aside izquierdo con solo el título y botones */}
            <aside className="flex-1 p-6 border-r overflow-auto flex flex-col justify-between">
                <div className="flex flex-col gap-4">

                    <h2 className="text-xl font-bold text-white">Editar Servicio</h2>

                    <button
                        type="button"
                        onClick={() => handlePreview("name")}
                        className={`${preview === "name" ? "bg-blue-700" : "bg-primary"} w-full  text-white px-4 py-2 transition duration-300 ease-in-out rounded-lg hover:bg-blue-700 flex items-center gap-2 `}
                    >
                        <Pencil size={16} /> Editar Nombre
                    </button>

                    <button
                        type="button"
                        onClick={() => handlePreview("description")}
                        className={`${preview === "description" ? "bg-blue-700" : "bg-primary"} w-full  text-white px-4 py-2 transition duration-300 ease-in-out rounded-lg hover:bg-blue-700 flex items-center gap-2 `}
                    >
                        <Pencil size={16} /> Editar Descripción
                    </button>

                    <button
                        type="button"
                        onClick={() => handlePreview("img")}
                        className={`${preview === "img" ? "bg-blue-700" : "bg-primary"} w-full  text-white px-4 py-2 transition duration-300 ease-in-out rounded-lg hover:bg-blue-700 flex items-center gap-2 `}
                    >
                        <Pencil size={16} /> Editar Imagen
                    </button>
                </div>


            </aside>

            {/* Derecha: solo se muestra lo seleccionado */}
            <form
                onSubmit={(e) => {
                    handleSubmit(e, formValues.id, refresh)
                }}
                className="flex-2 p-6 overflow-auto w-full max-w-full flex flex-col justify-between"
            >
                <div className="flex flex-col gap-2 h-full ">
                    <h2 className="text-lg font-semibold text-white mb-4">Previsualización y Edición</h2>

                    {preview === "name" && (
                        <div className="flex flex-col gap-4">
                            <label htmlFor="name" className="text-sm text-primary bg-white px-5 py-1 rounded w-fit">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                autoComplete="on"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                                className="w-full mt-1 border px-3 py-2 text-white rounded"
                            />
                        </div>
                    )}

                    {preview === "description" && (
                        <div className="flex flex-col gap-4 h-full">
                            <label htmlFor="description" className="text-sm text-primary bg-white px-5 py-1 rounded w-fit">Descripción</label>
                            <textarea
                                id="description"
                                name="description"
                                autoComplete="on"
                                value={formValues.description}
                                onChange={handleChange}
                                className="w-full mt-1  border px-3 py-2 text-white rounded resize-none h-3/4"
                            />
                        </div>
                    )}

                    {preview === "img" && (
                        <div className="flex flex-col gap-4 h-fit">
                            <label htmlFor="img" className="text-sm text-primary bg-white px-5 py-1 rounded w-fit">Imagen (URL)</label>
                            <img
                                src={formValues.img}
                                alt="Previsualización"
                                className="w-full h-70 object-contain rounded mb-2"
                            />
                            <input
                                id="img"
                                type="text"
                                name="img"
                                autoComplete="on"
                                value={formValues.img}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 text-white rounded"
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-fit"
                    >
                        Guardar cambios
                    </button>
                </div>

            </form>
        </div>
    )
}