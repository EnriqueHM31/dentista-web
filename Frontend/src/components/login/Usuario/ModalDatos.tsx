import { useUpdateUsuario } from "@/hooks/admin/Perfil/useDatosAdmin";
import { useGetUsuario } from "@/hooks/admin/Perfil/useGetUsuario";
import { useOpenWithTransition } from "@/hooks/general/useOpen";
import { FaUser } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";


export default function ModalDatos({ toggle: CerrarMenu }: { toggle: () => void }) {

    const { isOpen, toggle } = useOpenWithTransition()
    const { handleMostrarConfirmacion } = useUpdateUsuario(CerrarMenu);
    const { datosUsuario } = useGetUsuario();

    return (
        <form action="" className="flex flex-col gap-4 p-4  w-full" onSubmit={(e) => handleMostrarConfirmacion(e)
        }>
            <h2 className="text-xl font-bold text-primary max-w-3/4 w-full ">Nuevos datos de usuario</h2>
            <div className="w-full max-w-full  relative mt-4">
                <label htmlFor="username" className="block mb-2text-sm text-slate-600">
                    Nuevo nombre de usuario
                </label>

                <div className="relative w-full ">
                    <input type="text" inputMode="text" id="username" autoComplete="on" defaultValue={datosUsuario.username} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Odontologo LE" />
                    <button className="absolute left-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <FaUser className="size-4" />
                    </button>
                </div>
            </div>

            <div className="w-full max-w-full  relative mt-4">
                <label htmlFor="password" className="block mb-2 text-sm text-slate-600">
                    Nueva contraseña
                </label>

                <div className="relative w-full">
                    <input type={isOpen ? "text" : "password"} id="password" autoComplete="on" defaultValue={datosUsuario.password} inputMode="text" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="sai344xaMSAcl" />
                    <button className="absolute left-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <RiLockPasswordFill className="size-4" />
                    </button>

                    <button className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={toggle}>
                        <IoEyeSharp className="size-4" />
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-end">

                <button className="bg-primary text-white  py-2 px-4 text-[15px] font-medium tracking-wide rounded-md hover:bg-primary/90 focus:outline-none cursor-pointer w-fit mt-5 ">
                    Realizar cambios
                </button>
            </div>

        </form>
    );
}