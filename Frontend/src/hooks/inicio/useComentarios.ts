import { useState, useEffect } from "react";

interface Comentario {
    id: string;
    nombre: string;
    mensaje: string;
    ranking: number;
    visible: boolean | number;
}

export function useComentarios(comentariosVisibles: Comentario[]) {
    const [page, setPage] = useState(0);
    function getItemsPerPage() {
        const width = window.innerWidth;
        if (width < 768) return 1;        // móvil
        if (width < 1277) return 2;       // tablet
        return 3;                         // escritorio
    }
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());


    useEffect(() => {
        const handleResize = () => {
            const newItems = getItemsPerPage();
            setItemsPerPage(newItems);
            setPage(0); // resetear página para evitar overflow
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const comentariosParaEnseñar = comentariosVisibles.filter(
        (comentario) => comentario.visible === true || comentario.visible === 1
    );

    const totalPages = Math.ceil(comentariosParaEnseñar.length / itemsPerPage);
    const startIndex = page * itemsPerPage;
    const visibleTestimonials = comentariosParaEnseñar.slice(startIndex, startIndex + itemsPerPage);

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
