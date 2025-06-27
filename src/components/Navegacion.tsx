import { AiOutlineDingtalk } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from 'framer-motion'
import MenuNavegacion from './ui/MenuNavegacion';
import { useOpen } from "@/hooks/useOpen";
import { useEffect, useState } from "react";

export default function Navegacion() {

    const { isOpen, toggleMenu } = useOpen()
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight - 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const textColor = scrolled ? "text-black" : "text-white";
    const buttonClasses = scrolled
        ? "bg-primary text-white"
        : "bg-white text-primary";
    const buttonMovilClasses = scrolled
        ? "bg-white text-primary"
        : "bg-primary text-white";
    const menubackground = scrolled
        ? "bg-primary text-white"
        : "bg-white text-black";
    const clasesLogoIcono = scrolled ? "text-primary" : "text-white";
    const clasesLogoText = scrolled ? "text-black" : "text-white";

    return (
        <nav className='flex justify-between items-center py-4 px-6 xl:px-10 fixed top-0 left-0 right-0 z-50 backdrop-blur-xs xl:max-w-10/12 w-full xl:mx-auto'>
            <div className='flex items-center justify-center gap-2'>
                <AiOutlineDingtalk className={`text-4xl  ${clasesLogoIcono}`} />
                <h1 className={`text-lg font-semibold ${clasesLogoText}`}>Dentista LE</h1>
            </div>

            <MenuNavegacion isOpen={isOpen} toggleMenu={toggleMenu} clases={{ textColor, buttonClasses, buttonMovilClasses, menubackground }} />

            <button
                className={` p-1 size-10 rounded-2xl flex items-center justify-center z-100 overflow-hidden xl:hidden relative ${isOpen ? 'bg-white text-primary' : 'bg-primary text-white'}`}
                onClick={toggleMenu}
                type="button"
                aria-expanded={isOpen}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {
                        isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute"
                            >
                                <CgClose className={`text-2xl  font-bold`} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute"
                            >
                                <RiMenu3Fill className={`text-2xl  font-bold`} />
                            </motion.div>
                        )}
                </AnimatePresence>
            </button>



        </nav >
    )
}
