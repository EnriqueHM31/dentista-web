import { FILTROS_CHECKEADOS, FILTROS_ORDEN, LOCAL_STORAGE_FILTROS_KEY } from "@/constants/FiltrosComentarios";
import { ComentariosContext } from "@/context/Comentarios";
import { getComentarios } from "@/services/Comentarios";
import type { ComentarioProps, Filtros } from "@/types/Comentarios/types";
import type { UUID } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Clave para guardar los filtros en localStorage

export function ComentariosProvider({ children }: { children: React.ReactNode }) {
    const [comentariosOriginales, setComentariosOriginales] = useState<ComentarioProps[]>([]);
    const [comentariosFiltrados, setComentariosFiltrados] = useState<ComentarioProps[]>([]);

    const [filtros, setFiltrosState] = useState<Filtros>(() => {
        // Recuperar del localStorage si existe
        const filtrosGuardados = localStorage.getItem(LOCAL_STORAGE_FILTROS_KEY);
        if (filtrosGuardados) {
            try {
                return JSON.parse(filtrosGuardados) as Filtros;
            } catch (error) {
                console.warn("Error al parsear filtros guardados:", error);
            }
        }
        // Si no hay, usar valores por defecto
        return {
            ordenar: null,
            ranking: null,
            seleccion: null,
        };
    });

    // Guardar filtros en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_FILTROS_KEY, JSON.stringify(filtros));
    }, [filtros]);

    // Obtener comentarios original
    useEffect(() => {
        const obtenerComentarios = async () => {
            const { success, message, comentarios } = await getComentarios();

            if (success) {
                setComentariosOriginales(comentarios);
                setComentariosFiltrados(comentarios); // inicial: sin filtro
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
    };

    const refrescarComentariosEditar = (newComentarios: ComentarioProps[]) => {
        setComentariosOriginales(newComentarios);
    };

    return (
        <ComentariosContext.Provider
            value={{
                comentarios: comentariosFiltrados,
                comentariosVisibles: comentariosFiltrados,
                setComentarios: setComentariosFiltrados,
                filtros,
                setFiltros,
                refrescarComentariosEliminar,
                refrescarComentariosEditar,
            }}
        >
            {children}
        </ComentariosContext.Provider>
    );
}
