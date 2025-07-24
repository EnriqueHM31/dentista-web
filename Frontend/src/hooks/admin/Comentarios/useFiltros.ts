import { useState, useContext } from "react";
import { ComentariosContext } from "@/context/Comentarios";
import { MENU_FILTROS, FILTROS_ORDEN, FILTROS_CHECKEADOS } from "@/constants/filtrosComentarios";

type MenuFiltro = keyof typeof MENU_FILTROS;

export const useFiltrosComentarios = () => {
    const { filtros, setFiltros } = useContext(ComentariosContext);

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

    return {
        filtros,
        menusAbiertos,
        toggleMenu,
        seleccionarFiltro,
    };
};