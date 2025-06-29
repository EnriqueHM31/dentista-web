// components/ui/Modal.tsx
import { AnimatePresence, motion } from "framer-motion";
import { CgClose } from "react-icons/cg";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    clases?: string;
}

export default function Modal({ isOpen, onClose, children, clases }: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={`${clases} bg-white rounded-xl shadow-xl  w-full relative max-h-[90vh] overflow-auto`}
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {/* Cerrar */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-black hover:text-red-500 text-2xl font-bold cursor-pointer bg-white rounded-full p-2"
                        >
                            <CgClose />
                        </button>

                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
