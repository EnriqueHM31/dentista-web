import AnimatedSelect from "@/components/General/Select";
import { useServicioContext } from "@/context/Servicio";
import type { PropsModalEditarEspecialista } from "@/types/Especialistas/types";
import {
    AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLink, AiOutlinePicture, AiOutlineTool, AiOutlineHome,
} from "react-icons/ai";


export default function ModalEditarEspecialista({ toggle, especialistaSeleccionado, handleChange, handleEditarEspecialista, }: PropsModalEditarEspecialista) {

    const { servicios } = useServicioContext();

    return (
        <div className=" w-full  mx-auto p-5 bg-primary text-white ">
            <h2 className=" text-md md:text-xl font-bold mb-6 text-center">Editar Especialista</h2>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Imagen */}
                <div className="md:flex-1 flex items-center justify-center">
                    {especialistaSeleccionado?.avatar && (
                        <img
                            src={especialistaSeleccionado.avatar}
                            alt="Avatar actual"
                            className="w-3/4 mx-auto md:mx-0 md:w-full h-full object-cover border-1 rounded-2xl border-white"
                        />
                    )}
                </div>

                {/* Formulario */}
                <form onSubmit={(e) => handleEditarEspecialista(e, especialistaSeleccionado?.id as `${string}-${string}-${string}-${string}-${string}`)} className="md:flex-2 flex-3 md:grid flex flex-col  md:grid-cols-2 gap-8 w-full">
                    {/* Nombre */}
                    <label htmlFor="nombre" className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 font-medium text-white/50">
                            <AiOutlineUser /> Nombre
                        </span>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            value={especialistaSeleccionado?.nombre || ""}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded-md text-white"
                        />
                    </label>

                    {/* Apellido */}
                    <label htmlFor="apellido" className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 font-medium text-white/50">
                            <AiOutlineUser /> Apellido
                        </span>
                        <input
                            id="apellido"
                            type="text"
                            name="apellido"
                            value={especialistaSeleccionado?.apellido || ""}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded-md text-white"
                        />
                    </label>

                    {/* Servicio */}
                    <label htmlFor="servicio" className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 font-medium text-white/50">
                            <AiOutlineTool /> Servicio
                        </span>
                        <AnimatedSelect
                            name="servicio"
                            selectClass="bg-primary border border-white mt-1 text-white"
                            itemClass="bg-primary text-white"
                            itemHoverClass="hover:bg-white hover:text-primary"
                            options={servicios.map((servicio) => servicio.titulo)}
                            select={especialistaSeleccionado?.servicio || ""}
                            funcion={handleChange}
                        />
                    </label>

                    {/* Email */}
                    <label htmlFor="email" className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 font-medium text-white/50">
                            <AiOutlineMail /> Correo electrónico
                        </span>
                        <input
                            autoComplete="on"
                            id="email"
                            type="email"
                            name="email"
                            value={especialistaSeleccionado?.email || ""}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded-md text-white"
                        />
                    </label>

                    {/* Teléfono */}
                    <label htmlFor="telefono" className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 font-medium text-white/50">
                            <AiOutlinePhone /> Teléfono
                        </span>
                        <input
                            id="telefono"
                            type="text"
                            name="telefono"
                            value={especialistaSeleccionado?.telefono || ""}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded-md text-white"
                        />
                    </label>

                    <label htmlFor="direccion" className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 font-medium text-white/50">
                            <AiOutlineHome /> Dirección
                        </span>
                        <input
                            id="direccion"
                            type="text"
                            name="direccion"
                            value={especialistaSeleccionado?.direccion || ""}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded-md text-white"
                        />
                    </label>

                    {/* LinkedIn */}
                    <label htmlFor="linkedin" className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 font-medium text-white/50">
                            <AiOutlineLink /> LinkedIn
                        </span>
                        <input
                            id="linkedin"
                            type="text"
                            name="linkedin"
                            value={especialistaSeleccionado?.linkedin || ""}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded-md text-white"
                        />
                    </label>

                    {/* Avatar URL */}
                    <label htmlFor="avatar" className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 font-medium text-white/50">
                            <AiOutlinePicture /> Avatar (URL)
                        </span>
                        <input
                            id="avatar"
                            type="text"
                            name="avatar"
                            value={especialistaSeleccionado?.avatar || ""}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded-md text-white"
                        />
                    </label>

                    {/* Botones */}
                    <div className="flex justify-end gap-2 mt-4 col-span-2">
                        <button
                            type="button"
                            onClick={toggle}
                            className="px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-md"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
