import { AiOutlineDingtalk } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { LINKS_NAVEGACION } from "@/assets/ts/constantes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SOCIALS = [
    { label: 'Facebook', icono: <FaFacebookF className="w-5 h-5" /> },
    { label: 'Instagram', icono: <FaInstagram className="w-5 h-5" /> },
    { label: 'Twitter', icono: <FaTwitter className="w-5 h-5" /> },
    { label: 'LinkedIn', icono: <FaLinkedin className="w-5 h-5" /> },
];

interface SocialProps {
    id: string;
    nombre: string;
    referencia: string;
}

export default function Footer() {
    const [formData, setFormData] = useState<SocialProps[]>([]);

    useEffect(() => {

        const obtenerDatosSociales = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/sociales`);
                const { message } = await res.json();
                if (!Array.isArray(message)) {
                    throw new Error('El formato recibido no es un arreglo');
                }

                const nombresSocials = SOCIALS.map(s => s.label);
                const sociales = message.filter(item => nombresSocials.includes(item.nombre));
                setFormData(sociales);
            } catch (err) {
                console.error(err);
                toast.error('Error al cargar redes sociales');
            }

        };
        obtenerDatosSociales();
    }, []);

    return (
        <footer className="bg-primary text-white flex flex-col gap-2 py-4">
            <div className="flex flex-col gap-2 max-w-10/12 w-full mx-auto">
                <section className="flex *:items-center justify-between " >
                    <div className="flex items-center gap-2">
                        <AiOutlineDingtalk className="text-4xl" />
                        <h2>Odontologia LEHM</h2>
                    </div>
                    <div>
                        <nav>
                            <ul className="flex items-center gap-3">
                                {LINKS_NAVEGACION.map(({ name, path }, index) => (
                                    <li key={index}>
                                        <a href={path} className="hover:-translate-y-3 transition-transform  duration-400 ease-in-out border border-transparent  rounded-full inline-block p-2 hover:text-white/70">
                                            {name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </section>

                <section className="flex items-center justify-between">
                    <p> &copy; {new Date().getFullYear()} Odontologia LEHM</p>

                    <ul className="flex items-center gap-2">
                        {
                            formData.map(({ nombre, referencia }, index) => (
                                <li key={index} className="">
                                    <a
                                        href={referencia}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:scale-125 hover:-translate-y-3 transition-transform  duration-400 ease-in-out border border-transparent hover:border-white rounded-full  inline-block p-2"
                                    >
                                        {SOCIALS.find(s => s.label === nombre)?.icono}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </div>

        </footer>
    )
}