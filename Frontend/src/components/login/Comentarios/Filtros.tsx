import { FaChevronDown, FaStar, FaFilter } from "react-icons/fa";
import {
    MENU_FILTROS,
    FILTROS_ORDEN,
    FILTROS_CHECKEADOS,
    DATA_FILTRO_INICIAL,
    NOMBRES_FILTROS,
    NOMBRES_FILTROS_ORDEN,
    NOMBRES_FILTROS_SELECCION,
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
    const { filtros, menusAbiertos, toggleMenu, seleccionarFiltro, textoFiltroActivo, filtroActivo, menuFiltroActivoAbierto, handleClickMenuFiltroActivo } =
        useFiltrosComentarios();



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
                            {NOMBRES_FILTROS.todos}
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
                                        {NOMBRES_FILTROS_ORDEN.asc}
                                    </button>
                                    <button
                                        onClick={() =>
                                            seleccionarFiltro(MENU_FILTROS.ordenar, FILTROS_ORDEN.desc)
                                        }
                                        className={`${menuItemClass(filtros.ordenar === FILTROS_ORDEN.desc)} truncate whitespace-nowrap overflow-hidden text-ellipsis`}
                                    >
                                        {NOMBRES_FILTROS_ORDEN.desc}
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
                                        {NOMBRES_FILTROS_SELECCION.checkeados}
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
                                        {NOMBRES_FILTROS_SELECCION.no_checkeados}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Botón para abrir selector de filtro activo */}
                <button
                    onClick={handleClickMenuFiltroActivo}
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
                            onClick={() => seleccionarFiltro(MENU_FILTROS.todos)}
                        >
                            {NOMBRES_FILTROS.todos}
                        </button>
                        <button
                            className={menuItemClass(filtroActivo === MENU_FILTROS.ordenar)}
                            onClick={() => seleccionarFiltro(MENU_FILTROS.ordenar, DATA_FILTRO_INICIAL.ordenar as typeof FILTROS_ORDEN[keyof typeof FILTROS_ORDEN])}
                        >
                            {NOMBRES_FILTROS.ordenar}
                        </button>
                        <button
                            className={menuItemClass(filtroActivo === MENU_FILTROS.ranking)}
                            onClick={() => seleccionarFiltro(MENU_FILTROS.ranking, DATA_FILTRO_INICIAL.ranking as number)}
                        >
                            {NOMBRES_FILTROS.ranking}
                        </button>
                        <button
                            className={menuItemClass(filtroActivo === MENU_FILTROS.seleccion)}
                            onClick={() => seleccionarFiltro(MENU_FILTROS.seleccion, DATA_FILTRO_INICIAL.seleccion as typeof FILTROS_CHECKEADOS[keyof typeof FILTROS_CHECKEADOS])}
                        >
                            {NOMBRES_FILTROS.seleccion}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
