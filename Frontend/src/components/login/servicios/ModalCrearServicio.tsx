import AnimatedSelect from "@/components/General/Select"
import { formatoHoraMinuto } from "@/utils/Hora"
import { MINUTOS_ARRAY } from "@/utils/constantes"


interface ModalCrearServicioProps {
    handleClickDesactivarModal: () => void,
    handleSubmitCrearServicio: (e: React.FormEvent) => void
}

export default function ModalCrearServicio({ handleClickDesactivarModal, handleSubmitCrearServicio }: ModalCrearServicioProps) {



    return (
        <form className="w-full p-6 flex flex-col  gap-4 bg-primary min-h-[70vh]" onSubmit={(e) => {
            handleSubmitCrearServicio(e)
        }
        }>

            <h3 className="text-2xl font-bold text-white mb-4">Agregar un nuevo servicio</h3>
            <section className="flex gap-6 flex-2">
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

                    <div className="mb-4 flex flex-col gap-4">
                        <label htmlFor="duration" className="block text-sm font-medium px-3 py-1 text-primary rounded-xl bg-white w-fit mb-1">
                            Duracion
                        </label>
                        <AnimatedSelect name="duration" options={formatoHoraMinuto(MINUTOS_ARRAY)} clases="bg-primary text-white border-white hover:bg-white/80 hover:text-primary" />
                    </div>
                </div>
                <div className="mb-4 flex-3 flex flex-col gap-4">
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