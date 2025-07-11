import { useGetServicios } from "@/hooks/admin/Servicios/useGetServicios";

export default function ModalCrearServicio({ handleClickDesactivarModal, }: { handleClickDesactivarModal: () => void }) {

    const { handleSubmitCrearServicio } = useGetServicios();





    return (
        <form className="w-full p-6 flex flex-col  gap-4 bg-primary min-h-[70vh]" onSubmit={(e) => {
            handleSubmitCrearServicio(e)
            handleClickDesactivarModal()
        }
        }>

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