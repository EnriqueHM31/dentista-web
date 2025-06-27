import { useState } from "react"

export function useTooltip() {
    const [isHovered, setIsHovered] = useState(false)

    const positionClasses = {
        top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
        left: "right-full mr-2 top-1/2 -translate-y-1/2",
        right: "left-full ml-2 top-1/2 -translate-y-1/2",
    }

    const handleClickHovered = () => {
        setIsHovered(!isHovered)
    }

    return {
        isHovered,
        positionClasses,
        handleClickHovered
    }
}   