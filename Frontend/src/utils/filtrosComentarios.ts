import { FILTROS_ORDEN, FILTROS_CHECKEADOS } from "@/constants/FiltrosComentarios";
import type { Filtros } from "@/types/Comentarios/types";


export const textoOrden = (filtros: Filtros) =>
    filtros.ordenar === FILTROS_ORDEN.asc
        ? "Orden: Nombre A-Z"
        : filtros.ordenar === FILTROS_ORDEN.desc
            ? "Orden: Nombre Z-A"
            : "Ordenar";

export const textoRanking = (filtros: Filtros) => filtros.ranking
    ? `Ranking: ${filtros.ranking}★`
    : "Ranking";

export const textoSeleccion = (filtros: Filtros) =>
    filtros.seleccion === FILTROS_CHECKEADOS.checkeados
        ? "Seleccionados"
        : filtros.seleccion === FILTROS_CHECKEADOS.no_checkeados
            ? "No seleccionados"
            : "Selección";



export const btnBase = "px-4 py-2 rounded-lg transition border border-gray-300 flex items-center gap-2";
export const isActive = (condition: boolean) =>
    condition ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-black hover:bg-primary/10";

export const menuItemClass = (active: boolean) =>
    `w-full text-left px-4 py-2 hover:bg-primary hover:text-white ${active ? "bg-primary text-white font-semibold" : ""}`;