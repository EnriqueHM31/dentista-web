import { FaChevronDown, FaStar } from "react-icons/fa";
import { MENU_FILTROS, FILTROS_ORDEN, FILTROS_CHECKEADOS } from "@/constants/filtrosComentarios";
import { textoOrden, textoRanking, textoSeleccion, btnBase, isActive, menuItemClass } from "@/utils/filtrosComentarios";
import { useFiltrosComentarios } from "@/hooks/admin/Comentarios/useFiltros";



export default function Filtros() {

    const { filtros, menusAbiertos, toggleMenu, seleccionarFiltro } = useFiltrosComentarios();

    return (
        <section className="relative py-4">
            <div className="flex gap-4 flex-wrap items-center">
                <button
                    className={`${btnBase} ${isActive(!filtros.ordenar && !filtros.ranking && !filtros.seleccion)}`}
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
                                onClick={() => seleccionarFiltro(MENU_FILTROS.ordenar, FILTROS_ORDEN.asc)}
                                className={menuItemClass(filtros.ordenar === FILTROS_ORDEN.asc)}
                            >
                                Nombre A-Z
                            </button>
                            <button
                                onClick={() => seleccionarFiltro(MENU_FILTROS.ordenar, FILTROS_ORDEN.desc)}
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
                                    className={`flex items-center gap-2 ${menuItemClass(filtros.ranking === stars)}`}
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
                                onClick={() => seleccionarFiltro(MENU_FILTROS.seleccion, FILTROS_CHECKEADOS.checkeados)}
                                className={menuItemClass(filtros.seleccion === FILTROS_CHECKEADOS.checkeados)}
                            >
                                Seleccionados
                            </button>
                            <button
                                onClick={() => seleccionarFiltro(MENU_FILTROS.seleccion, FILTROS_CHECKEADOS.no_checkeados)}
                                className={menuItemClass(filtros.seleccion === FILTROS_CHECKEADOS.no_checkeados)}
                            >
                                No seleccionados
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
