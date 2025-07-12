import { useState } from "react";

interface Comentario {
    id: string;
    nombre: string;
    mensaje: string;
    ranking: number;
    visible: boolean | number;
}

export function useComentarios(comentariosVisibles: Comentario[]) {
    const ITEMS_PER_PAGE = 3;
    const [page, setPage] = useState(0);

    const comentariosParaEnseñar = comentariosVisibles.filter((comentario) => comentario.visible === true || comentario.visible === 1);
    const totalPages = Math.ceil(comentariosParaEnseñar.length / ITEMS_PER_PAGE);

    const startIndex = page * ITEMS_PER_PAGE;
    const visibleTestimonials = comentariosParaEnseñar.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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