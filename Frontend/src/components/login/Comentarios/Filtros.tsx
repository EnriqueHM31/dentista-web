import { useState } from "react";
import { FaChevronDown, FaStar, FaFilter } from "react-icons/fa";
import {
    MENU_FILTROS,
    FILTROS_ORDEN,
    FILTROS_CHECKEADOS,
    DATA_FILTRO_INICIAL,
} from "@/constants/filtrosComentarios";
import {
    textoOrden,
    textoRanking,
    textoSeleccion,
    btnBase,
    isActive,
    menuItemClass,
} from "@/utils/filtrosComentarios";
import { useFiltrosComentarios } from "@/hooks/admin/Comentarios/useFiltros";


export default function Filtros() {
    const { filtros, menusAbiertos, toggleMenu, seleccionarFiltro } =
        useFiltrosComentarios();

    // Estado local para menú extra en móvil (selector de filtro activo)
    const [menuFiltroActivoAbierto, setMenuFiltroActivoAbierto] = useState(false);

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
                return "Todos";
        }
    };

    // Función para cambiar filtro activo en menú móvil
    const seleccionarFiltroActivo = (filtro: keyof typeof MENU_FILTROS, valor?: typeof FILTROS_ORDEN[keyof typeof FILTROS_ORDEN] | number | typeof FILTROS_CHECKEADOS[keyof typeof FILTROS_CHECKEADOS]) => {
        setMenuFiltroActivoAbierto(false);

        if (filtro === MENU_FILTROS.todos) {
            seleccionarFiltro(MENU_FILTROS.todos);
        } else if (filtro === MENU_FILTROS.ordenar) {
            seleccionarFiltro(MENU_FILTROS.ordenar, valor);
        } else if (filtro === MENU_FILTROS.ranking) {
            seleccionarFiltro(MENU_FILTROS.ranking, valor);
        } else if (filtro === MENU_FILTROS.seleccion) {
            seleccionarFiltro(MENU_FILTROS.seleccion, valor);
        }
    };

    return (
        <section className="relative py-4">
            {/* Escritorio: mostrar todos los botones */}
            <div className="hidden md:flex gap-4 flex-wrap items-center md:justify-start justify-center">
                <button
                    className={`${btnBase} ${isActive(
                        !filtros.ordenar && !filtros.ranking && !filtros.seleccion
                    )}`}
                    onClick={() => seleccionarFiltro(MENU_FILTROS.todos)}
                >
                    Todos
                </button>

                {/* Ordenar */}
                <div className="relative">
                    <button
                        onClick={() => toggleMenu(MENU_FILTROS.ordenar)}
                        className={`${btnBase} ${isActive(!!filtros.ordenar)}`}
                    >
                        {textoOrden(filtros)} <FaChevronDown className="text-xs" />
                    </button>
                    {menusAbiertos.ordenar && (
                        <div className="absolute top-full mt-2 z-50 bg-white shadow-lg rounded-lg border w-40 overflow-hidden">
                            <button
                                onClick={() =>
                                    seleccionarFiltro(MENU_FILTROS.ordenar, FILTROS_ORDEN.asc)
                                }
                                className={menuItemClass(filtros.ordenar === FILTROS_ORDEN.asc)}
                            >
                                Nombre A-Z
                            </button>
                            <button
                                onClick={() =>
                                    seleccionarFiltro(MENU_FILTROS.ordenar, FILTROS_ORDEN.desc)
                                }
                                className={menuItemClass(filtros.ordenar === FILTROS_ORDEN.desc)}
                            >
                                Nombre Z-A
                            </button>
                        </div>
                    )}
                </div>

                {/* Ranking */}
                <div className="relative">
                    <button
                        onClick={() => toggleMenu(MENU_FILTROS.ranking)}
                        className={`${btnBase} ${isActive(!!filtros.ranking)}`}
                    >
                        {textoRanking(filtros)} <FaChevronDown className="text-xs" />
                    </button>
                    {menusAbiertos.ranking && (
                        <div className="absolute top-full mt-2 z-50 bg-white shadow-lg rounded-lg border flex overflow-hidden">
                            {[5, 4, 3, 2, 1].map((stars) => (
                                <button
                                    key={stars}
                                    onClick={() => seleccionarFiltro(MENU_FILTROS.ranking, stars)}
                                    className={`flex items-center gap-2 ${menuItemClass(
                                        filtros.ranking === stars
                                    )}`}
                                >
                                    {stars}
                                    <FaStar className="text-yellow-400" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Selección */}
                <div className="relative">
                    <button
                        onClick={() => toggleMenu(MENU_FILTROS.seleccion)}
                        className={`${btnBase} ${isActive(!!filtros.seleccion)}`}
                    >
                        {textoSeleccion(filtros)} <FaChevronDown className="text-xs" />
                    </button>
                    {menusAbiertos.seleccion && (
                        <div className="absolute top-full mt-2 z-50 bg-white shadow-lg rounded-lg border w-44 overflow-hidden">
                            <button
                                onClick={() =>
                                    seleccionarFiltro(MENU_FILTROS.seleccion, FILTROS_CHECKEADOS.checkeados)
                                }
                                className={menuItemClass(
                                    filtros.seleccion === FILTROS_CHECKEADOS.checkeados
                                )}
                            >
                                Seleccionados
                            </button>
                            <button
                                onClick={() =>
                                    seleccionarFiltro(MENU_FILTROS.seleccion, FILTROS_CHECKEADOS.no_checkeados)
                                }
                                className={menuItemClass(
                                    filtros.seleccion === FILTROS_CHECKEADOS.no_checkeados
                                )}
                            >
                                No seleccionados
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Móvil: mostrar solo filtro activo + selector */}
            <div className="flex md:hidden items-center justify-between px-4">
                {/* Filtro activo */}
                <div className="flex-1">
                    {filtroActivo === MENU_FILTROS.todos && (
                        <button
                            className={`${btnBase} w-full flex justify-between items-center truncate whitespace-nowrap overflow-hidden text-ellipsis gap-1`}
                            onClick={() => seleccionarFiltro(MENU_FILTROS.todos)}
                        >
                            Todos
                        </button>
                    )}

                    {filtroActivo === MENU_FILTROS.ordenar && (
                        <div className="relative">
                            <button
                                onClick={() => toggleMenu(MENU_FILTROS.ordenar)}
                                className={`${btnBase} w-full flex justify-between items-center truncate whitespace-nowrap overflow-hidden text-ellipsis gap-1`}
                            >
                                {textoFiltroActivo()} <FaChevronDown className="text-xs" />
                            </button>
                            {menusAbiertos.ordenar && (
                                <div className="absolute top-full mt-2 z-50 bg-white shadow-lg rounded-lg border w-full overflow-hidden border-primary">
                                    <button
                                        onClick={() =>
                                            seleccionarFiltro(MENU_FILTROS.ordenar, FILTROS_ORDEN.asc)
                                        }
                                        className={`${menuItemClass(filtros.ordenar === FILTROS_ORDEN.asc)} truncate whitespace-nowrap overflow-hidden text-ellipsis`}
                                    >
                                        Nombre A-Z
                                    </button>
                                    <button
                                        onClick={() =>
                                            seleccionarFiltro(MENU_FILTROS.ordenar, FILTROS_ORDEN.desc)
                                        }
                                        className={`${menuItemClass(filtros.ordenar === FILTROS_ORDEN.desc)} truncate whitespace-nowrap overflow-hidden text-ellipsis`}
                                    >
                                        Nombre Z-A
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {filtroActivo === MENU_FILTROS.ranking && (
                        <div className="relative">
                            <button
                                onClick={() => toggleMenu(MENU_FILTROS.ranking)}
                                className={`${btnBase} w-full flex justify-between items-center truncate whitespace-nowrap overflow-hidden text-ellipsis gap-1`}
                            >
                                {textoFiltroActivo()} <FaChevronDown className="text-xs" />
                            </button>
                            {menusAbiertos.ranking && (
                                <div className="absolute top-full mt-2 z-50 bg-white shadow-lg rounded-lg border flex overflow-hidden w-full flex-wrap border-primary">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <button
                                            key={stars}
                                            onClick={() => seleccionarFiltro(MENU_FILTROS.ranking, stars)}
                                            className={`flex items-center gap-2 max-w-1/2${menuItemClass(
                                                filtros.ranking === stars
                                            )}`}
                                        >
                                            {stars}
                                            <FaStar className="text-yellow-400" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {filtroActivo === MENU_FILTROS.seleccion && (
                        <div className="relative">
                            <button
                                onClick={() => toggleMenu(MENU_FILTROS.seleccion)}
                                className={`${btnBase} w-full flex justify-between items-center truncate whitespace-nowrap overflow-hidden text-ellipsis gap-1`}
                            >
                                {textoFiltroActivo()} <FaChevronDown className="text-xs" />
                            </button>
                            {menusAbiertos.seleccion && (
                                <div className="absolute  top-full mt-2 z-100 bg-white shadow-lg rounded-lg border border-primary w-full overflow-hidden">
                                    <button
                                        onClick={() =>
                                            seleccionarFiltro(
                                                MENU_FILTROS.seleccion,
                                                FILTROS_CHECKEADOS.checkeados
                                            )
                                        }
                                        className={`${menuItemClass(
                                            filtros.seleccion === FILTROS_CHECKEADOS.checkeados
                                        )} truncate whitespace-nowrap overflow-hidden text-ellipsis`}
                                    >
                                        Seleccionados
                                    </button>
                                    <button
                                        onClick={() =>
                                            seleccionarFiltro(
                                                MENU_FILTROS.seleccion,
                                                FILTROS_CHECKEADOS.no_checkeados
                                            )
                                        }
                                        className={menuItemClass(
                                            filtros.seleccion === FILTROS_CHECKEADOS.no_checkeados
                                        )}
                                    >
                                        No seleccionados
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Botón para abrir selector de filtro activo */}
                <button
                    onClick={() => setMenuFiltroActivoAbierto((v) => !v)}
                    className="ml-2 p-2 rounded border border-gray-300 bg-white hover:bg-primary hover:text-white transition"
                    aria-label="Seleccionar filtro"
                    title="Seleccionar filtro"
                >
                    <FaFilter />
                </button>

                {/* Menú para seleccionar filtro activo (solo en móvil) */}
                {menuFiltroActivoAbierto && (
                    <div className="absolute top-full w-full left-0 bg-white shadow-lg rounded-lg border border-primary p-2 z-40 flex flex-col gap-3">
                        <button
                            className={menuItemClass(filtroActivo === MENU_FILTROS.todos)}
                            onClick={() => seleccionarFiltroActivo(MENU_FILTROS.todos)}
                        >
                            Todos
                        </button>
                        <button
                            className={menuItemClass(filtroActivo === MENU_FILTROS.ordenar)}
                            onClick={() => seleccionarFiltroActivo(MENU_FILTROS.ordenar, DATA_FILTRO_INICIAL.ordenar as typeof FILTROS_ORDEN[keyof typeof FILTROS_ORDEN])}
                        >
                            Ordenar
                        </button>
                        <button
                            className={menuItemClass(filtroActivo === MENU_FILTROS.ranking)}
                            onClick={() => seleccionarFiltroActivo(MENU_FILTROS.ranking, DATA_FILTRO_INICIAL.ranking as number)}
                        >
                            Ranking
                        </button>
                        <button
                            className={menuItemClass(filtroActivo === MENU_FILTROS.seleccion)}
                            onClick={() => seleccionarFiltroActivo(MENU_FILTROS.seleccion, DATA_FILTRO_INICIAL.seleccion as typeof FILTROS_CHECKEADOS[keyof typeof FILTROS_CHECKEADOS])}
                        >
                            Selección
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
