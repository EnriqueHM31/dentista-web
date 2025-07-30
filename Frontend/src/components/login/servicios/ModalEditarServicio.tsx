import AnimatedSelect from "@/components/General/Select";
import { MINUTOS_ARRAY } from "@/constants/generales";
import { OPCIONES_EDITAR_SERVICIO } from "@/constants/Servicios";
import { useEditarServicio } from "@/hooks/admin/Servicios/useEditarServicio";
import type { ModalEditarServicioProps, ServicioProps } from "@/types/Servicios/types";
import type { UUID } from "@/types/types";
import { formatoHoraMinutoArray, formatoHoraMinutoSingle } from "@/utils/Hora";
import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";


export default function ModalEditarServicio({ serviciosRef, handleClickDesactivarModal, formValues, handleChange }: ModalEditarServicioProps) {
    const { preview, handlePreview, handleSubmit } = useEditarServicio({ serviciosRef, formValues, handleClickDesactivarModal });
    const [mostrarSelector, setMostrarSelector] = useState(false);

    return (
        <div className="bg-primary w-full h-[80vh] rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
            {/* Aside izquierdo: solo visible en md+ */}
            <aside className="hidden md:flex flex-1 p-6 border-r flex-col justify-between">
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-white">Editar Servicio</h2>
                    {OPCIONES_EDITAR_SERVICIO.map((op) => (
                        <button
                            key={op.value}
                            type="button"
                            onClick={() => handlePreview(op.value as keyof ServicioProps)}
                            className={`${preview === op.value ? "bg-blue-700" : "bg-primary"} w-full text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2`}
                        >
                            <FaPencil size={16} /> Editar {op.label}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Modal selector móvil */}
            {mostrarSelector && (
                <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center md:hidden">
                    <div className="bg-white rounded-lg p-6 w-5/6 max-w-sm">
                        <h3 className="text-primary text-lg font-semibold mb-4">Seleccionar campo a editar</h3>
                        <div className="flex flex-col gap-2">
                            {OPCIONES_EDITAR_SERVICIO.map((op) => (
                                <button
                                    key={op.value}
                                    onClick={() => {
                                        handlePreview(op.value as keyof ServicioProps);
                                        setMostrarSelector(false);
                                    }}
                                    className="text-white rounded-2xl bg-primary  border border-primary  px-4 py-2 hover:bg-primary hover:text-white"
                                >
                                    {op.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Derecha: contenido editable */}
            <form
                onSubmit={(e) => handleSubmit(e, formValues.id as UUID)}
                className="flex-2 p-6 overflow-auto w-full max-w-full flex flex-col justify-between relative"
            >
                {/* Botón selector móvil */}

                <div className="flex flex-col gap-5 md:gap-2 h-full">
                    <h2 className="text-lg font-semibold text-white mb-4 max-w-3/4 md:max-w-full">Previsualización y Edición</h2>

                    <button
                        type="button"
                        className="md:hidden flex items-center gap-2 justify-between px-6 z-30 bg-white p-2  rounded-2xl shadow mb-4"
                        onClick={() => setMostrarSelector(true)}
                    >
                        {
                            preview && (

                                preview?.charAt(0).toUpperCase() + preview?.slice(1) || "Seleccionar campo"
                            )

                        }
                        <IoIosArrowDown />
                    </button>
                    {preview === "titulo" && (
                        <div className="flex flex-col gap-4">
                            <label htmlFor="titulo" className="text-sm hidden md:flex text-primary bg-white px-5 py-1 rounded w-fit">Nombre</label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                autoComplete="on"
                                value={formValues.titulo}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 text-white rounded"
                            />
                        </div>
                    )}

                    {preview === "descripcion" && (
                        <div className="flex flex-col gap-4 h-full">
                            <label htmlFor="descripcion" className="text-sm hidden md:flex text-primary bg-white px-5 py-1 rounded w-fit">Descripción</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                autoComplete="on"
                                value={formValues.descripcion}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 text-white rounded resize-none h-full md:h-3/4"
                            />
                        </div>
                    )}

                    {preview === "img" && (
                        <div className="flex flex-col gap-4">
                            <label htmlFor="img" className="text-sm hidden md:flex text-primary bg-white px-5 py-1 rounded w-fit">Imagen (URL)</label>
                            <img
                                src={formValues.img}
                                alt="Previsualización"
                                className="w-full h-full md:h-60 object-contain rounded mb-2"
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

                    {preview === "duration" && (
                        <div className="flex flex-col gap-4">
                            <label htmlFor="duration" className="text-sm hidden md:flex text-primary bg-white px-5 py-1 rounded w-fit">Duración</label>
                            <AnimatedSelect
                                funcion={handleChange}
                                select={formatoHoraMinutoSingle(formValues.duration
                                    ? formValues?.duration.toString()
                                    : "0"
                                )}
                                name="duration"
                                options={formatoHoraMinutoArray(MINUTOS_ARRAY)}
                                itemClass="bg-primary text-white border-white hover:bg-white/80 hover:text-primary"
                                selectClass="bg-primary text-white border-white hover:bg-white/80 hover:text-primary border border-white"
                                itemHoverClass="   hover:bg-white/80 hover:text-primary"
                                menuClass="border border-white"
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-fit">
                        Guardar cambios
                    </button>
                </div>
            </form>
        </div>
    );
}
