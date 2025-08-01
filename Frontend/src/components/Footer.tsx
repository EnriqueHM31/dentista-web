import { LINKS_NAVEGACION } from "@/constants/generales";
import { useSocialesContext } from "@/context/Sociales";
import { AiOutlineDingtalk } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

const SOCIALS = [
    { label: 'Facebook', icono: <FaFacebookF className="w-5 h-5" /> },
    { label: 'Instagram', icono: <FaInstagram className="w-5 h-5" /> },
    { label: 'Twitter', icono: <FaTwitter className="w-5 h-5" /> },
    { label: 'LinkedIn', icono: <FaLinkedin className="w-5 h-5" /> },
];

export default function Footer() {
    const { sociales } = useSocialesContext();

    const DataSocialesFooter = sociales.filter(s => SOCIALS.some(s2 => s2.label === s.nombre));

    return (
        <footer className="bg-primary text-white flex flex-col gap-2 py-4">
            <div className="flex flex-col gap-2 max-w-10/12 w-full mx-auto">
                <section className="flex flex-col md:flex-row items-center justify-between " >
                    <div className="flex items-center gap-2 order-2 md:order-1">
                        <AiOutlineDingtalk className="text-4xl" />
                        <h2>Odontologia LEHM</h2>
                    </div>
                    <div className="order-1 md:order-2">
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

                <section className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 w-full ">
                    <p className="order-2 md:order-1"> &copy; {new Date().getFullYear()} Odontología LEHM</p>

                    <ul className="order-1 md:order-2 flex w-full md:w-auto justify-center items-center gap-2">
                        {
                            DataSocialesFooter.map(({ nombre, referencia }, index) => (
                                <li key={index} >
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