import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getComentarios } from "@/services/Comentarios";
import { ComentariosContext } from "@/context/Comentarios";
import type { ComentarioProps, Filtros } from "@/types/Comentarios/types";
import { FILTROS_CHECKEADOS, FILTROS_ORDEN } from "@/constants/filtrosComentarios";
import type { UUID } from "crypto";


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
        if (filtros.seleccion === FILTROS_CHECKEADOS.checkeados) {
            resultado = resultado.filter(c => !!c.visible);
        } else if (filtros.seleccion === FILTROS_CHECKEADOS.no_checkeados) {
            resultado = resultado.filter(c => !c.visible);
        }

        // Ordenar
        if (filtros.ordenar === FILTROS_ORDEN.asc) {
            resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (filtros.ordenar === FILTROS_ORDEN.desc) {
            resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
        }

        setComentariosFiltrados(resultado);
    }, [filtros, comentariosOriginales]);

    // Función para actualizar filtros parciales
    const setFiltros = (nuevosFiltros: Partial<Filtros>) => {
        setFiltrosState(prev => ({ ...prev, ...nuevosFiltros }));
    };


    const refrescarComentariosEliminar = (id: UUID) => {
        setComentariosOriginales(prev => prev.filter(c => c.id !== id));
    }

    const refrescarComentariosEditar = (newComentarios: ComentarioProps[]) => {
        setComentariosOriginales(newComentarios);
    }

    return (
        <ComentariosContext.Provider value={{ comentarios: comentariosFiltrados, comentariosVisibles: comentariosFiltrados, setComentarios: setComentariosFiltrados, filtros, setFiltros, refrescarComentariosEliminar, refrescarComentariosEditar }}>
            {children}
        </ComentariosContext.Provider>
    );
}
