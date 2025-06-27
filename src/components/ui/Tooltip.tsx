import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TooltipProps {
    text: string
    children: React.ReactNode
    position?: "top" | "bottom" | "left" | "right"
}

export default function Tooltip({ text, children, position = "top" }: TooltipProps) {
    const [isHovered, setIsHovered] = useState(false)

    const positionClasses = {
        top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
        left: "right-full mr-2 top-1/2 -translate-y-1/2",
        right: "left-full ml-2 top-1/2 -translate-y-1/2",
    }

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        key="tooltip"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute ${positionClasses[position]} 
              z-10 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white shadow-md`}
                    >
                        {text}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    )
}
