import { LINKS_NAVEGACION, VARIANTES_MENU } from "@/constants/generales";
import type { MenuNavegacionProps } from "@/types/Menu/types";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function MenuLateral({ isOpen, toggleMenu, clases }: MenuNavegacionProps) {
    const location = useLocation();

    const { textColor, buttonClasses, buttonMovilClasses, menubackground, BackgrounAfter, hoverColor } = clases;


    return (
        <>
            {/* 📱 Menú MÓVIL */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        key="menu"
                        variants={VARIANTES_MENU}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`fixed top-0 right-0 z-50 h-screen w-3/4 max-w-full ${menubackground} flex flex-col gap-6 justify-center px-6 xl:hidden`}
                    >
                        {LINKS_NAVEGACION.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    onClick={toggleMenu}
                                    className={`block py-2 text-lg transition duration-300 ${hoverColor} ${location.pathname === link.path ? "font-bold italic" : ""
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a
                                href="/citas"
                                rel="noopener noreferrer"
                                className={`mt-4 font-semibold px-4 py-2 rounded-xl w-full transition duration-300 ease-in-out hover:scale-105 cursor-pointer ${buttonMovilClasses}`}
                            >
                                Realizar una cita
                            </a>
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>

            {/* 💻 Menú ESCRITORIO */}
            <ul
                className={`hidden xl:flex gap-8 items-center transition duration-300 ${textColor}`}
            >
                {LINKS_NAVEGACION.map((link) => (
                    <li key={link.name} className="relative">
                        <Link
                            to={link.path}
                            className={`relative ${hoverColor} transition duration-300 py-1 ${location.pathname === link.path ? "font-bold after:w-full" : "after:w-0"
                                }
                after:content-['']
                after:block
                after:absolute
                after:h-0.5
                ${BackgrounAfter}
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
                    <a
                        href="/citas"
                        rel="noopener noreferrer"
                        className={`font-semibold px-4 py-1 text-md rounded-xl transition-all duration-300 ease-in-out hover:scale-105 ${buttonClasses} cursor-pointer`}
                    >
                        Realizar una cita
                    </a>
                </li>
            </ul>
        </>
    );
}
