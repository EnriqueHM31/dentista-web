import { useState } from "react"

export function useOpen() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return {
        isOpen,
        toggleMenu
    }
}