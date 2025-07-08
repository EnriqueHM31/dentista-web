import Modal from "@/components/general/Modal";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { useOpenWithTransition } from "@/hooks/general/useOpenWithTransition";
import { useGetServicios } from "@/hooks/admin/useGetServicios";

interface Servicio {
    name: string;
    description: string;
    img: string;
}

interface ServicioResponse extends Servicio {
    id: `${string}-${string}-${string}-${string}-${string}` | "";
}

export default function Servicios() {
    const { isOpen, toggle } = useOpenWithTransition();
    const { servicios, serviciosRef, refrescarUpdateServicio } = useGetServicios();
    const [preview, setPreview] = useState<keyof Servicio | null>('name');
    const [formValues, setFormValues] = useState<ServicioResponse>({ id: "", name: "", description: "", img: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handlePreview = (campo: keyof Servicio) => {
        setPreview(campo);
    };

    const handleEdit = (servicio: ServicioResponse) => {
        setFormValues(servicio);
        toggle();
    };

    const handleSubmit = async (e: React.FormEvent, id: string) => {
        e.preventDefault();

        // Verificar si hubo cambios

        console.log(serviciosRef.current);
        const cambios = (Object.keys(formValues) as (keyof Servicio)[]).filter(
            (key) => formValues[key] !== serviciosRef.current.find((s) => s.id === id)?.[key]
        );

        if (cambios.length === 0) {
            toast.info("No hay cambios para guardar.");
            return;
        }
        console.log(cambios);

        // Si hay cambios, confirmar
        toast("¿Estás seguro que quieres guardar los cambios?", {
            action: {
                label: "Guardar",
                onClick: async () => {
                    try {
                        const data = cambios.reduce((acc, key) => {
                            acc[key] = formValues[key];
                            return acc;
                        }, {} as Partial<ServicioResponse>);

                        console.log(data);

                        const response = await fetch(
                            `${import.meta.env.VITE_API_URL}/servicios/${id}`,
                            {
                                method: "PUT",
                                body: JSON.stringify(data),
                                headers: {
                                    "content-type": "application/json",
                                }
                            }
                        );

                        const { success, message } = await response.json();

                        if (success) {
                            toast.success("Cambios guardados correctamente");
                            refrescarUpdateServicio(id, data);
                            toggle(); // cerrar modal
                        } else {
                            toast.error(message || "Error al guardar los cambios.");
                        }
                    } catch (error) {
                        toast.error("Error de red al guardar los cambios.");
                        console.error(error);
                    }
                },
            },
            cancel: {
                label: "Cancelar",
                onClick: () => {
                    toast.dismiss();
                },
            },
        });
    };



    return (
        <>
            <Modal isOpen={isOpen} onClose={toggle} clases="max-w-3/4 w-full">
                <div className="bg-white w-full h-[80vh] rounded-lg overflow-hidden shadow-lg flex">
                    {/* Aside izquierdo con solo el título y botones */}
                    <aside className="flex-1 p-6 border-r overflow-auto flex flex-col justify-between">
                        <div className="flex flex-col gap-4">

                            <h2 className="text-xl font-bold text-primary">Editar Servicio</h2>

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
                        onSubmit={(e) => handleSubmit(e, formValues.id)}
                        className="flex-2 p-6 overflow-auto w-full max-w-full flex flex-col justify-between"
                    >
                        <div className="flex flex-col gap-2">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Previsualización y Edición</h2>

                            {preview === "name" && (
                                <div>
                                    <label className="text-sm text-gray-600">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleChange}
                                        className="w-full mt-1 border px-3 py-2 rounded"
                                    />
                                </div>
                            )}

                            {preview === "description" && (
                                <div className="h-full">
                                    <label className="text-sm text-gray-600">Descripción</label>
                                    <textarea
                                        name="description"
                                        value={formValues.description}
                                        onChange={handleChange}
                                        className="w-full mt-1 border px-3 py-2 rounded resize-none h-3/4"
                                    />
                                </div>
                            )}

                            {preview === "img" && (
                                <div className="flex flex-col gap-4 h-fit">
                                    <label className="text-sm text-primary font-bold">Imagen (URL)</label>
                                    <img
                                        src={formValues.img}
                                        alt="Previsualización"
                                        className="w-full h-70 object-contain rounded mb-2"
                                    />
                                    <input
                                        type="text"
                                        name="img"
                                        value={formValues.img}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded"
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
            </Modal>


            <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-primary">Servicios</h2>

                <ul className="grid xl:grid-cols-2 md:grid-cols-1 w-full gap-6">
                    {servicios.map((servicio) => (
                        <li
                            key={servicio.id}
                            className="flex gap-3 justify-between bg-primary text-white px-4 py-2 rounded-lg"
                        >
                            <h3>{servicio.name}</h3>
                            <div className="flex gap-5">
                                <button
                                    className="cursor-pointer hover:text-white/80"
                                    onClick={() => handleEdit(servicio)}
                                >
                                    <FiEdit />
                                </button>

                                <button className="cursor-pointer hover:text-white/80">
                                    <FiTrash2 />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
