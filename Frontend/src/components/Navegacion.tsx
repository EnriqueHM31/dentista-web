import { AiOutlineDingtalk } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from 'framer-motion'
import MenuNavegacion from '@/components/Inicio/ui/MenuNavegacion';
import { useOpenWithTransition } from "@/hooks/general/useOpenWithTransition";
import { useScroll } from "@/hooks/inicio/useScroll";

export default function Navegacion() {

    const { isOpen, toggle } = useOpenWithTransition()
    const { scrolled, clasesLogoIcono, clasesLogoText, menubackground, textColor, buttonClasses, buttonMovilClasses, BackgrounAfter, hoverColor } = useScroll()

    return (
        <nav className={`flex justify-center items-center py-4 px-4 xl:px-10 fixed top-0 left-0 right-0 z-50 backdrop-blur-xs xl:max-w-full w-full xl:mx-auto ${scrolled ? 'bg-white' : 'bg-primary'}`}>

            <div className="flex items-center justify-between gap-2 max-w-10/12 w-full">

                <div className='flex items-center justify-center gap-2'>
                    <AiOutlineDingtalk className={`text-4xl  ${clasesLogoIcono}`} />
                    <h1 className={`text-lg font-semibold ${clasesLogoText}`}>Odontologia LE</h1>
                </div>

                <MenuNavegacion isOpen={isOpen} toggleMenu={toggle} clases={{ textColor, buttonClasses, buttonMovilClasses, menubackground, BackgrounAfter, hoverColor }} />

                <button
                    className={` p-1 size-10 rounded-2xl flex items-center justify-center z-100 overflow-hidden xl:hidden relative ${isOpen ? 'bg-white text-primary' : 'bg-primary text-white'}`}
                    onClick={toggle}
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

            </div>


        </nav >
    )
}
