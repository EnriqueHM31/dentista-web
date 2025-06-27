import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { VARIANTES_MENU, LINKS_NAVEGACION } from "@/assets/ts/constantes";

export default function MenuLateral({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void; }) {
    const location = useLocation();

    return (
        <>
            {/* 📱 Menú MÓVIL animado con Framer Motion */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        key="menu"
                        variants={VARIANTES_MENU}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-0 right-0 z-50 h-screen w-3/4 max-w-full bg-primary text-white flex flex-col gap-6 justify-center px-6 xl:hidden"
                    >
                        {LINKS_NAVEGACION.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className={`block py-2 text-lg transition-colors duration-300 hover:text-accent ${location.pathname === link.path ? "font-bold" : ""
                                        }`}
                                    onClick={toggleMenu}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button className="mt-4 bg-white text-primary font-semibold px-4 py-2 rounded-xl w-full transition-transform hover:scale-105">
                                Realizar una cita
                            </button>
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>

            {/* 💻 Menú ESCRITORIO sin animaciones (siempre visible) */}
            <ul className="hidden xl:flex gap-8 items-center">
                {LINKS_NAVEGACION.map((link) => (
                    <li key={link.name} className="relative">
                        <Link
                            to={link.path}
                            className={`
                                relative text-black hover:text-accent transition-colors duration-300 py-1
                                ${location.pathname === link.path ? "font-bold after:w-full" : "after:w-0"}
                                after:content-['']
                                after:block
                                after:absolute
                                after:h-0.5
                                after:bg-primary
                                after:bottom-0
                                after:left-0
                                after:rounded-full
                                after:transition-all
                                after:duration-300
                                after:ease-in-out
                                hover:after:w-full
                            `}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
                <li>
                    <button className="bg-primary cursor-pointer text-white font-semibold px-4 py-1 text-md rounded-xl transition-transform hover:scale-105">
                        Realizar una cita
                    </button>
                </li>
            </ul>
        </>
    );
}
