export const LOCAL_STORAGE_FILTROS_KEY = "filtros_comentarios";
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

export const NOMBRES_FILTROS = {
    todos: "Todos",
    ordenar: "Ordenar",
    ranking: "Ranking",
    seleccion: "Seleccion",
} as const;

export const NOMBRES_FILTROS_ORDEN = {
    asc: "Nombre A-Z",
    desc: "Nombre Z-A",
} as const;


export const NOMBRES_FILTROS_SELECCION = {
    "checkeados": "Seleccionados",
    "no_checkeados": "No seleccionados",
}