export const MENU_FILTROS = {
    todos: "todos",
    ordenar: "ordenar",
    ranking: "ranking",
    seleccion: "seleccion",
} as const;

export const FILTROS_ORDEN = {
    asc: "asc",
    desc: "desc",
} as const;

export const FILTROS_CHECKEADOS = {
    checkeados: "checkeados",
    no_checkeados: "no_checkeados",
} as const;

export const DATA_FILTRO_INICIAL = {
    ordenar: FILTROS_ORDEN.asc,
    ranking: 5,
    seleccion: FILTROS_CHECKEADOS.checkeados,
}
