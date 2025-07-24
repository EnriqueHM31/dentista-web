
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

type MenuFiltro = keyof typeof MENU_FILTROS;
type FiltrosCheckeados = keyof typeof FILTROS_CHECKEADOS;
type FiltrosOrden = keyof typeof FILTROS_ORDEN;

interface EstadoFiltros {
    selected: {
        todos: boolean;
        ordenar: FiltrosOrden | null;
        ranking: number | null;
        seleccion: FiltrosCheckeados | null;
    };
    menus: {
        ordenar: boolean;
        ranking: boolean;
        seleccion: boolean;
    };
}
