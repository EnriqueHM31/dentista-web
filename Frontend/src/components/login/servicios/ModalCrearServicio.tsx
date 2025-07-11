import { esURLValida } from "@/assets/ts/constantes";
import type { ServicioResponse } from "@/types";
import { toast } from "sonner";

export default function ModalCrearServicio({ handleClickDesactivarModal, refrescarCrearServicio }: { handleClickDesactivarModal: () => void, refrescarCrearServicio: ({ id, name, description, img }: ServicioResponse) => void }) {



    const handleSubmitCrearServicio = async (e: React.FormEvent) => {

        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);
        const { titulo, descripcion, img } = Object.fromEntries(data.entries());

        if (!titulo || !descripcion || !img) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (!esURLValida(img.toString())) {
            toast.error("La imagen no es válida");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/servicios`, {
                method: "POST",
                body: JSON.stringify({ titulo, descripcion, img }),
                headers: {
                    "content-type": "application/json",
                }
            });

            const { success, message, servicio } = await response.json();

            if (success) {
                toast.success("Servicio creado correctamente");
                handleClickDesactivarModal();
                refrescarCrearServicio(servicio);
            } else {
                toast.error(message || "Error al crear el servicio");
            }
        } catch (error) {
            toast.error("Error de red al crear el servicio");
            console.error(error);
        }

    }

    return (
        <form className="w-full p-6 flex flex-col  gap-4 bg-primary min-h-[70vh]" onSubmit={(e) => handleSubmitCrearServicio(e)}>

            <h3 className="text-2xl font-bold text-white mb-4">Agregar un nuevo servicio</h3>
            <section className="flex gap-6 flex-1">
                <div className="flex-1 flex flex-col gap-3">

                    <div className="mb-4 flex flex-col gap-4">
                        <label htmlFor="servicio" className="block text-sm font-medium px-3 py-1 text-primary bg-white rounded-xl  mb-1 w-fit">
                            Servicio
                        </label>
                        <input
                            id="servicio"
                            type="text"
                            name="titulo"
                            className="w-full border rounded px-3 py-2 text-white border-white focus:outline-none focus:ring-2 focus:ring-white"
                            required
                        />
                    </div>


                    <div className="mb-4 flex flex-col gap-4">
                        <label htmlFor="img" className="block text-sm font-medium px-3 py-2 text-primary rounded-xl bg-white  w-fit mb-1">
                            Imagen (URL)
                        </label>
                        <input
                            id="img"
                            type="text"
                            name="img"
                            className="w-full border rounded px-3 py-1 text-white border-white focus:outline-none focus:ring-2 focus:ring-white"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4 flex-1 flex flex-col gap-4">
                    <label htmlFor="descripcion" className="block text-sm font-medium px-3 py-1 text-primary rounded-xl bg-white w-fit mb-1">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        className="w-full h-full border rounded px-3 py-2 text-white border-white focus:outline-none focus:ring-2 focus:ring-white resize-none scrollbar-hide"
                        required
                    />
                </div>

            </section>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={handleClickDesactivarModal}
                    className="px-4 py-2  rounded text-white bg-red-600 cursor-pointer hover:bg-red-400"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-primary-dark transition cursor-pointer"
                >
                    Crear
                </button>
            </div>
        </form>
    )
}