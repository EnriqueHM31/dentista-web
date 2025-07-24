import { useState } from "react";
import type { RankingProps } from "@/types/Components/types";

export function useRanking({ onChange }: RankingProps) {

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