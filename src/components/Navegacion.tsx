import { AiOutlineDingtalk } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from 'framer-motion'
import MenuLateral from './ui/MenuMovil';
import { useOpen } from "@/hooks/useOpen";

export default function Navegacion() {

    const { isOpen, toggleMenu } = useOpen()

    return (
        <nav className='flex justify-between items-center py-4 px-6 fixed top-0 left-0 right-0 z-50 backdrop-blur-xs xl:max-w-10/12 w-full xl:mx-auto'>
            <div className='flex items-center justify-center gap-2'>
                <AiOutlineDingtalk className='text-4xl text-primary' />
                <h1 className='text-lg font-semibold'>Dentista LE</h1>
            </div>

            <MenuLateral isOpen={isOpen} toggleMenu={toggleMenu} />

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
                                <CgClose className="text-2xl  font-bold" />
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
                                <RiMenu3Fill className="text-2xl  font-bold" />
                            </motion.div>
                        )}
                </AnimatePresence>
            </button>



        </nav >
    )
}
