import { useState } from "react";

export function useRanking(onChange?: (value: number) => void) {

    const [hovered, setHovered] = useState<number | null>(null);
    const [selected, setSelected] = useState<number>(0);

    const handleMouseEnter = (index: number) => setHovered(index);
    const handleMouseLeave = () => setHovered(null);

    const handleClick = (index: number) => {
        setSelected(index);
        onChange?.(index);
    };

    const rating = hovered ?? selected;

    return { selected, handleMouseEnter, handleMouseLeave, handleClick, rating };
}