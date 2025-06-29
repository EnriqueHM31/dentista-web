import { useState } from "react";

interface useComentariosProps {
    client_name: string;
    rating: number;
    comment: string;
}

export function useComentarios({ TESTIMONIOS }: { TESTIMONIOS: useComentariosProps[] }) {
    const ITEMS_PER_PAGE = 3;
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(TESTIMONIOS.length / ITEMS_PER_PAGE);

    const startIndex = page * ITEMS_PER_PAGE;
    const visibleTestimonials = TESTIMONIOS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleNext = () => {
        if (page < totalPages - 1) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    };

    return {
        page,
        totalPages,
        startIndex,
        visibleTestimonials,
        handleNext,
        handlePrevious,
    };
}