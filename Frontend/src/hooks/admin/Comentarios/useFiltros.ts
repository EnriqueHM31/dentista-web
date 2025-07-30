import { FILTROS_CHECKEADOS, FILTROS_ORDEN, MENU_FILTROS } from "@/constants/FiltrosComentarios";
import { useComentariosContext } from "@/context/Comentarios";
import type { MenuFiltro } from "@/types/Comentarios/types";
import { textoOrden, textoRanking, textoSeleccion } from "@/utils/filtrosComentarios";
import { useState } from "react";

export const useFiltrosComentarios = () => {
    const { filtros, setFiltros } = useComentariosContext();
    const [menuFiltroActivoAbierto, setMenuFiltroActivoAbierto] = useState(false);

    const handleClickMenuFiltroActivo = () => {
        setMenuFiltroActivoAbierto(prev => !prev);
    };

    const [menusAbiertos, setMenusAbiertos] = useState({
        ordenar: false,
        ranking: false,
        seleccion: false,
    });

    const toggleMenu = (menu: keyof typeof menusAbiertos) => {
        setMenusAbiertos(prev => ({
            ordenar: false,
            ranking: false,
            seleccion: false,
            [menu]: !prev[menu],
        }));
    };

    const seleccionarFiltro = (tipo: MenuFiltro, valor?: typeof FILTROS_ORDEN[keyof typeof FILTROS_ORDEN] | number | typeof FILTROS_CHECKEADOS[keyof typeof FILTROS_CHECKEADOS]) => {
        if (tipo === MENU_FILTROS.todos) {
            setFiltros({ ordenar: null, ranking: null, seleccion: null });
        } else if (tipo === MENU_FILTROS.ordenar) {
            setFiltros({ ordenar: valor as typeof FILTROS_ORDEN[keyof typeof FILTROS_ORDEN], ranking: null, seleccion: null });
        } else if (tipo === MENU_FILTROS.ranking) {
            setFiltros({ ranking: valor as number, ordenar: null, seleccion: null });
        } else if (tipo === MENU_FILTROS.seleccion) {
            setFiltros({ seleccion: valor as typeof FILTROS_CHECKEADOS[keyof typeof FILTROS_CHECKEADOS], ordenar: null, ranking: null });
        }
        setMenusAbiertos({ ordenar: false, ranking: false, seleccion: false });
    };
    // Detectar cuál filtro está activo (o todos)
    const filtroActivo =
        filtros.ordenar !== null
            ? MENU_FILTROS.ordenar
            : filtros.ranking !== null
                ? MENU_FILTROS.ranking
                : filtros.seleccion !== null
                    ? MENU_FILTROS.seleccion
                    : MENU_FILTROS.todos;

    // Texto para mostrar filtro activo (en móvil)
    const textoFiltroActivo = () => {
        switch (filtroActivo) {
            case MENU_FILTROS.ordenar:
                return textoOrden(filtros);
            case MENU_FILTROS.ranking:
                return textoRanking(filtros);
            case MENU_FILTROS.seleccion:
                return textoSeleccion(filtros);
            default:
                return MENU_FILTROS.todos;
        }
    };

    return {
        filtros,
        menusAbiertos,
        menuFiltroActivoAbierto,
        textoFiltroActivo,
        toggleMenu,
        seleccionarFiltro,
        handleClickMenuFiltroActivo,
        filtroActivo,
    };
};