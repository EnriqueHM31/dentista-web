import { AiOutlineDingtalk } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { LINKS_NAVEGACION } from "@/assets/ts/constantes";

const SOCIALS = [
    { icono: <FaFacebookF className="w-5 h-5" />, link: "https://www.facebook.com/dental.lehm" },
    { icono: <FaInstagram className="w-5 h-5" />, link: "https://www.instagram.com/dental.lehm" },
    { icono: <FaTwitter className="w-5 h-5" />, link: "https://twitter.com/dental_lehm" },
    { icono: <FaLinkedin className="w-5 h-5" />, link: "https://www.linkedin.com/company/dental-lehm" },
];

export default function Footer() {
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
                            SOCIALS.map(({ icono, link }, index) => (
                                <li key={index} className="">
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:scale-125 hover:-translate-y-3 transition-transform  duration-400 ease-in-out border border-transparent hover:border-white rounded-full  inline-block p-2"
                                    >
                                        {icono}
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