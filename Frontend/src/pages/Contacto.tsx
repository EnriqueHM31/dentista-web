import TituloSeccion from "@/components/Inicio/ui/TituloSeccion";
import { CgPhone } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import AnimatedSelect from "@/components/General/Select";
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import IMAGENCONTACTO from "@/assets/img/contacto.png";
import { useUtils } from "@/hooks/general/useUtils";
import { useContext } from "react";
import { toast } from "sonner";
import { SocialesContext } from "@/context/Sociales";
import StarRating from "@/components/Inicio/Comentarios/Ranking";
import { ServicioContext } from "@/context/Servicio";
import { createComentario } from "@/services/Comentarios";

const MAS_CONTACTOS = [
    { icono: <CgPhone className="text-2xl " />, label: "Telefono" },
    { icono: <MdEmail className="text-2xl" />, label: "Correo" },
    { icono: <FaMapMarkerAlt className="text-2xl " />, label: "Direccion" },
]


export default function Contacto() {

    const { handleClickCopy } = useUtils();
    const { sociales } = useContext(SocialesContext);
    const { servicios } = useContext(ServicioContext);

    const formData = sociales.filter(({ nombre }) => MAS_CONTACTOS.some(({ label }) => label === nombre));

    const handleSubmitCorreo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const form = Object.fromEntries(data) as Record<string, string>;

        const { username, email, categoria, message: comentario, experiencia } = form;

        try {
            const { success, message } = await createComentario({ username, email, categoria, comentario, ranking: parseInt(experiencia) })

            if (!success) {
                toast.error(message);
            }

            toast.success(message || "Mensaje enviado exitosamente");
        } catch {
            toast.error("Error al enviar mensaje");
        }
    }


    return (
        <>
            <section className=" w-full gap-12 mt-20 py-10 md:py-15 xl:py-10 min-h-screen flex flex-col lg:flex-row justify-start md:justify-center max-w-11/12 md:max-w-10/12 mx-auto px-2 md:px-6 items-center md:items-stretch " id="contacto">
                <div className="flex-1 flex flex-col gap-8 order-2 md:order-1">
                    <div className="flex flex-col gap-4">
                        <TituloSeccion titulo="Hablemos de algo interesante juntos" clases="text-start max-w-3/4 px-3" />
                        <ul>
                            {
                                formData.map(({ id, nombre, referencia }) => (
                                    <li key={id} className="flex gap-4 items-center px-3 py-3 rounded-2xl hover:bg-primary/90  transition duration-300 ease-in-out w-fit cursor-pointer max-w-full text-primary hover:text-white" onClick={() => handleClickCopy(referencia, `Se ha copiado ${referencia}`)}>
                                        {MAS_CONTACTOS.find(s => s.label === nombre)?.icono}
                                        <p>{referencia}</p>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>

                    <img src={IMAGENCONTACTO} alt="Imagen contacto" className="w-full h-full rounded-2xl" />


                </div >

                <div className="flex-1 md:h-full md:min-h-screen order-1 md:order-2">

                    <form
                        action=""
                        className="flex flex-col gap-8 bg-primary text-white p-8 rounded-2xl md:h-full min-h-screen"
                        onSubmit={(e) => handleSubmitCorreo(e)}
                    >
                        <h2 className="md:text-xl text-md">Manda un comentario o sugerencia de ...</h2>

                        <AnimatedSelect
                            name="categoria"
                            select="Selecciona un servicio"
                            selectClass="bg-primary border border-white mt-1 text-white"
                            itemClass="bg-primary text-white"
                            itemHoverClass="hover:bg-white hover:text-primary"
                            options={servicios.map(({ titulo }) => titulo)}
                        />

                        <div className="flex flex-col gap-4">
                            <h4 className="md:text-xl text-md font-semibold">Nivel de experiencia del cliente</h4>
                            <StarRating name="experiencia" />
                        </div>

                        <h3 className="md:text-xl text-md font-bold">Escribe tu comentario o sugerencia</h3>

                        <label htmlFor="username" className="flex items-center gap-3 border-b-2 border-white px-1 py-2 focus-within:border-white transition-all duration-200">
                            <FaUser className="text-3xl p-1" />
                            <input
                                id="username"
                                type="text"
                                name="username"
                                required
                                placeholder="Nombre del cliente"
                                minLength={3}
                                maxLength={30}
                                autoComplete="on"
                                className="w-full bg-transparent text-xs md:text-base outline-none placeholder:text-white/50"
                            />
                        </label>

                        <label htmlFor="email" className="flex items-center gap-3 border-b-2 border-white px-1 py-2 focus-within:border-white transition-all duration-200">
                            <MdEmail className="text-3xl p-1" />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoComplete="on"
                                placeholder="Correo electrónico"
                                className="w-full bg-transparent  text-xs md:text-base  outline-none placeholder:text-white/50"
                            />
                        </label>

                        <label htmlFor="message" className="flex items-center gap-3 border-b-2 border-white px-1 py-2 focus-within:border-white transition-all duration-200">
                            <FaMessage className="text-3xl p-1" />
                            <input
                                id="message"
                                type="text"
                                name="message"
                                required
                                placeholder="Mensaje"
                                className="w-full bg-transparent text-xs md:text-base   outline-none placeholder:text-white/50"
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