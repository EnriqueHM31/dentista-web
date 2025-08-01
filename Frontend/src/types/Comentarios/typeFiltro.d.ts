
export const MENU_FILTROS = {
    todos: "todos",
    ordenar: "ordenar",
    ranking: "ranking",
    seleccion: "seleccion",
} as const;

export const FILTROS_CHECKEADOS = {
    checkeados: "checkeados",
    no_checkeados: "no_checkeados",
} as const;

export const FILTROS_ORDEN = {
    asc: "asc",
    desc: "desc",
} as const;

export type MenuFiltro = keyof typeof MENU_FILTROS;
export type FiltrosCheckeados = keyof typeof FILTROS_CHECKEADOS;
export type FiltrosOrden = keyof typeof FILTROS_ORDEN;

