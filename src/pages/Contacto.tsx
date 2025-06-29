import TituloSeccion from "@/components/Inicio/ui/TituloSeccion";
import { CgPhone } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import AnimatedSelect from "@/components/general/Select";
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import IMAGENCONTACTO from "@/assets/img/contacto.png";



export default function Contacto() {
    return (
        <>
            <section className=" w-full gap-12 mt-20 py-20 md:py-15 xl:py-10 min-h-screen flex justify-center    max-w-10/12 mx-auto p-6 items-stretch " id="contacto">
                <div className="flex-1 flex flex-col gap-8 ">
                    <div className="flex flex-col gap-4">
                        <TituloSeccion titulo="Hablemos de algo interesante juntos" clases="text-start max-w-3/4" />
                        <ul>
                            <li className="flex gap-4 items-center px-4 py-3 rounded-2xl hover:bg-primary/90 transition duration-300 ease-in-out w-full cursor-pointer max-w-1/2 text-primary hover:text-white" >
                                <MdEmail className="text-2xl" />
                                <p>dentista@gmail.com</p>
                            </li>
                            <li className="flex gap-4 items-center px-4 py-3 rounded-2xl hover:bg-primary/90 transition duration-300 ease-in-out w-full cursor-pointer max-w-1/2 text-primary hover:text-white" >
                                <CgPhone className="text-2xl " />
                                <p>+56 111 111 1111</p>
                            </li>
                            <li className="flex gap-4 items-center px-4 py-3 rounded-2xl hover:bg-primary/90 transition duration-300 ease-in-out w-full cursor-pointer max-w-1/2 text-primary hover:text-white" >
                                <FaMapMarkerAlt className="text-2xl " />
                                <p>Calle 123, 123 123 123</p>
                            </li>

                        </ul>
                    </div>

                    <img src={IMAGENCONTACTO} alt="Imagen contacto" className="w-full h-full rounded-2xl" />


                </div >

                <div className="flex-1 h-full min-h-screen">
                    <form action="" className="flex flex-col gap-8 bg-primary text-white p-8 rounded-2xl h-full min-h-screen ">
                        <h2>Estoy interesado en...</h2>
                        <AnimatedSelect
                            name="categoria"
                            options={["Opción 1", "Opción 2", "Opción 3"]}
                            onChange={(v) => console.log("Seleccionado:", v)}
                        />

                        <h3 className="text-2xl font-bold mt-12">¿Quieres saber más?</h3>

                        <label className="flex items-center gap-3 border-b-2 border-white px-1 py-2 focus-within:border-white transition-all duration-200">
                            <FaUser className="text-3xl p-1" />

                            <input
                                type="text"
                                name="username"
                                required
                                placeholder="Nombre del cliente"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength={3}
                                maxLength={30}
                                title="Only letters, numbers, or dashes. Must start with a letter."
                                className="w-full bg-transparent outline-none placeholder:text-white/50"
                            />
                        </label>

                        <label className="flex items-center gap-3 border-b-2 border-white px-1 py-2 focus-within:border-white transition-all duration-200">
                            <MdEmail className="text-3xl p-1" />

                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Correo electrónico"
                                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                                title="Must be a valid email address."
                                className="w-full bg-transparent outline-none placeholder:text-white/50"
                            />
                        </label>

                        <label className="flex items-center gap-3 border-b-2 border-white px-1 py-2 focus-within:border-white transition-all duration-200">
                            <FaMessage className="text-3xl p-1" />

                            <input
                                type="text"
                                name="message"
                                required
                                placeholder="Mensaje"
                                title="Message cannot be empty."
                                className="w-full bg-transparent outline-none placeholder:text-white/50"
                            />
                        </label>


                        <div className="flex justify-end mt-5">
                            <button
                                type="submit"
                                className="w-fit rounded-lg px-6 py-2 bg-white text-primary hover:bg-white/85 transition duration-300 ease-in-out cursor-pointer"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}