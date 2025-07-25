import AnimatedSelect from "@/components/General/Select"
import { formatoHoraMinuto } from "@/utils/Hora"
import { MINUTOS_ARRAY } from "@/utils/constantes"
import type { ModalCrearServicioProps } from "@/types/Servicios/types"

export default function ModalCrearServicio({ handleClickDesactivarModal, handleSubmitCrearServicio, handledescartarCambiosCrearServicio, handleCambiarCampoServicio, servicioCrear }: ModalCrearServicioProps) {

    return (
        <form className="w-full p-6 flex flex-col  gap-4 bg-primary min-h-[70vh]" onSubmit={(e) => {
            handleSubmitCrearServicio(e)
        }
        }>

            <h3 className="text-lg max-w-3/4 md:max-w-full md:text-2xl font-bold text-white mb-4">Agregar un nuevo servicio</h3>
            <section className="flex flex-col gap-3 flex-2">
                <div className="flex-1 flex flex-col md:flex-row gap-3">

                    <div className="mb-4 flex flex-col flex-1 gap-4">
                        <label htmlFor="servicio" className="block text-sm font-medium px-3 py-2 text-primary bg-white rounded-xl  mb-1 w-fit">
                            Servicio
                        </label>
                        <input
                            id="servicio"
                            type="text"
                            name="titulo"
                            value={servicioCrear.titulo}
                            onChange={(e) => handleCambiarCampoServicio(e)}
                            className="w-full border rounded px-3 py-2 text-white border-white focus:outline-none focus:ring-2 focus:ring-white"
                            required
                        />
                    </div>


                    <div className="mb-4 flex flex-col flex-1 gap-4">
                        <label htmlFor="img" className="block text-sm font-medium px-3 py-2 text-primary rounded-xl bg-white  w-fit mb-1">
                            Imagen (URL)
                        </label>
                        <input
                            id="img"
                            type="text"
                            name="img"
                            value={servicioCrear.img}
                            onChange={(e) => handleCambiarCampoServicio(e)}
                            className="w-full border rounded px-3 py-2 text-white border-white focus:outline-none focus:ring-2 focus:ring-white"
                            required
                        />
                    </div>

                    <div className="mb-4 flex flex-col flex-1 gap-4">
                        <label htmlFor="duration" className="block text-sm font-medium px-3 py-2 text-primary rounded-xl bg-white w-fit mb-1">
                            Duracion
                        </label>
                        <AnimatedSelect
                            name="duration"
                            options={formatoHoraMinuto(MINUTOS_ARRAY)}
                            select={servicioCrear.duration.toString()}
                            onChange={(e) => handleCambiarCampoServicio(e)}
                            selectClass="bg-primary border border-white text-white"
                            itemClass="bg-primary text-white"
                            itemHoverClass="hover:bg-white hover:text-primary"
                        />
                    </div>
                </div>
                <div className="mb-4 flex-3 flex flex-col gap-4 ">
                    <label htmlFor="descripcion" className="block text-sm font-medium px-3 py-2 text-primary rounded-xl bg-white w-fit mb-1 h-full">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={servicioCrear.descripcion}
                        onChange={(e) => handleCambiarCampoServicio(e)}
                        className="w-full  min-h-[200px] h-full border rounded px-3 py-2 text-white border-white focus:outline-none focus:ring-2 focus:ring-white resize-none scrollbar-hide"
                        required
                    />
                </div>

            </section>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => handledescartarCambiosCrearServicio(handleClickDesactivarModal)}
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