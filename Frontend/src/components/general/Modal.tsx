// components/ui/Modal.tsx
import type { ModalProps } from "@/types/Modales/types";
import { AnimatePresence, motion } from "framer-motion";
import { CgClose } from "react-icons/cg";

export default function Modal({ isOpen, onClose, children, clases, modalId, activeId }: ModalProps) {
    const shouldShow = modalId ? activeId === modalId : isOpen;

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    className="fixed inset-0 z-150 flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={`${clases} bg-white rounded-xl shadow-xl w-full relative max-h-[90vh] overflow-auto`}
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-black hover:text-red-500 text-lg md:text-2xl font-bold cursor-pointer bg-white rounded-full p-2 z-70"
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
