import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getComentarios } from "@/services/Comentarios";
import { ComentariosContext } from "@/context/Comentarios";
import type { ComentarioProps, Filtros } from "@/types/Comentarios/types";


export function ComentariosProvider({ children }: { children: React.ReactNode }) {
    const [comentariosOriginales, setComentariosOriginales] = useState<ComentarioProps[]>([]);
    const [comentariosFiltrados, setComentariosFiltrados] = useState<ComentarioProps[]>([]);
    const [filtros, setFiltrosState] = useState<Filtros>({
        ordenar: null,
        ranking: null,
        seleccion: null,
    });

    // Obtener comentarios original
    useEffect(() => {
        const obtenerComentarios = async () => {
            const { success, message } = await getComentarios();

            if (success) {
                setComentariosOriginales(message);
                setComentariosFiltrados(message); // inicial: sin filtro
            } else {
                toast.error(message);
            }
        };

        obtenerComentarios();
    }, []);

    // Aplicar filtros cada vez que filtros o comentariosOriginales cambian
    useEffect(() => {
        let resultado = [...comentariosOriginales];

        // Filtrar ranking
        if (filtros.ranking !== null) {
            resultado = resultado.filter(c => c.ranking === filtros.ranking);
        }

        // Filtrar visibilidad
        if (filtros.seleccion === "checkeados") {
            resultado = resultado.filter(c => c.visible === true || c.visible === 1);
        } else if (filtros.seleccion === "no_checkeados") {
            resultado = resultado.filter(c => !(c.visible === true || c.visible === 1));
        }

        // Ordenar
        if (filtros.ordenar === "asc") {
            resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (filtros.ordenar === "desc") {
            resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
        }

        setComentariosFiltrados(resultado);
    }, [filtros, comentariosOriginales]);

    // Función para actualizar filtros parciales
    const setFiltros = (nuevosFiltros: Partial<Filtros>) => {
        setFiltrosState(prev => ({ ...prev, ...nuevosFiltros }));
    };

    return (
        <ComentariosContext.Provider value={{ comentarios: comentariosFiltrados, comentariosVisibles: comentariosFiltrados, setComentarios: setComentariosFiltrados, filtros, setFiltros }}>
            {children}
        </ComentariosContext.Provider>
    );
}
