import AnimatedSelect from "@/components/General/Select";
import { EspecialistasContext } from "@/context/Especialistas";
import { ServicioContext } from "@/context/Servicio";
import type { Especialista } from "@/types";
import { useActionState, useContext, useEffect } from "react";
import {
    AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLink, AiOutlinePicture, AiOutlineTool, AiOutlineHome,
} from "react-icons/ai";
import { toast } from "sonner";

interface PropsModalEditarEspecialista {
    handleClickDesactivarModal: () => void;
    handleCrearEspecialista: (state: CrearEspecialistaState, formData: FormData) => CrearEspecialistaState | Promise<CrearEspecialistaState>;
}

interface CrearEspecialistaState {
    success: boolean;
    message: string;
    especialistaCreado: Especialista | null;
}

export default function ModalCrearEspecialista({ handleClickDesactivarModal, handleCrearEspecialista }: PropsModalEditarEspecialista) {

    const { servicios } = useContext(ServicioContext);
    const { setEspecialistas, ordenarEspecialistas } = useContext(EspecialistasContext);

    const [stateCrearEspecialista, formActionCrearEspecialista, isPendingCrearEspecialista] = useActionState<CrearEspecialistaState, FormData>(
        handleCrearEspecialista,
        { success: false, message: "", especialistaCreado: null }
    );

    const { success, message, especialistaCreado } = stateCrearEspecialista;

    useEffect(() => {
        if (message) {
            if (success && especialistaCreado) {
                setEspecialistas(prev => {
                    const newArray = [...prev, especialistaCreado as Especialista];

                    return ordenarEspecialistas(newArray);
                }
                );
                toast.success(message);
                handleClickDesactivarModal();
            } else {
                toast.error(message);
            }
        }
    }, [message]);



    return (
        <div className=" w-full  mx-auto p-5 bg-primary text-white ">
            <h2 className=" text-md md:text-xl font-bold mb-6 text-center">Editar Especialista</h2>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Imagen */}
                <div className="md:flex-1 flex items-center justify-center">

                </div>

                {/* Formulario */}
                <form action={formActionCrearEspecialista} className="md:flex-2 flex-3 md:grid flex flex-col  md:grid-cols-2 gap-8 w-full">
                    {/* Nombre */}
                    <label htmlFor="nombre" className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 font-medium text-white/50">
                            <AiOutlineUser /> Nombre
                        </span>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
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
                            className="border px-3 py-2 rounded-md text-white"
                        />
                    </label>

                    <label htmlFor="direccion" className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 font-medium text-white/50">
                            <AiOutlineHome /> Direccion
                        </span>
                        <input
                            id="direccion"
                            type="text"
                            name="direccion"
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
                            className="border px-3 py-2 rounded-md text-white"
                        />
                    </label>

                    {/* Botones */}
                    <div className="flex justify-end gap-2 mt-4 col-span-2">
                        <button
                            type="button"
                            onClick={handleClickDesactivarModal}
                            className="px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-md"
                            disabled={isPendingCrearEspecialista}
                        >
                            {isPendingCrearEspecialista ? "Creando..." : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
