import type { EspecialistaProps } from "@/types/Especialistas/types";
import { useState } from "react";

export function useCarrusel({ slides }: { slides: EspecialistaProps[] }) {
    const [current, setCurrent] = useState(0);

    const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent(previous < 0 ? slides.length - 1 : previous);
    };

    const handleNextClick = () => {
        const next = current + 1;
        setCurrent(next === slides.length ? 0 : next);
    };

    const handleSlideClick = (index: number) => {
        if (current !== index) {
            setCurrent(index);
        }
    };

    return {
        current,
        handlePreviousClick,
        handleNextClick,
        handleSlideClick,
    };
}