import { motion, AnimatePresence } from "framer-motion"
import type { TooltipProps } from "@/types/Components/types"
import { useTooltip } from "@/hooks/general/useTooltip"

export default function Tooltip({ text, children, position = "top" }: TooltipProps) {
    const { isHovered, positionClasses, handleClickHovered } = useTooltip()
    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleClickHovered}
            onMouseLeave={handleClickHovered}
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
