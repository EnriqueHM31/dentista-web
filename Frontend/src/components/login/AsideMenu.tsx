import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import Tooltip from "@/components/General/Tooltip";
import type { AsideMenuProps } from "@/types";
import { getIconosAside, getIconoLogout } from "@/components/General/ObjetosIconos";
import { useOpenWithTransition } from "@/hooks/general/useOpenWithTransition";
import BotonItemAside from "./AsideMenu/BotonItemAside";
import { useLogin } from "@/hooks/admin/Perfil/useLogin";
import { useEffect } from "react";

export default function AsideMenu({ selected, handleClickSelected }: AsideMenuProps) {
    const { isOpen, toggle, setIsOpen } = useOpenWithTransition();
    const menuItems = getIconosAside();
    const { label, icon: IconLogout, id } = getIconoLogout();
    const { handleLogout } = useLogin();

    useEffect(() => {
        const width = window.innerWidth;
        if (width < 768) {
            setIsOpen(false);
        }
    }, [setIsOpen]);

    return (
        <>
            {/* Botón flotante en móviles */}
            < div className="fixed top-4 left-4 z-50 md:hidden" >
                <button
                    className="bg-primary text-white p-2 rounded-full shadow-md"
                    onClick={toggle}
                    title="Abrir menú"
                >
                    <AiOutlineMenuFold className="text-xl" />
                </button>
            </ div >

            {/* Menú móvil */}
            {

                <aside
                    className={`fixed top-0 left-0 w-64 h-screen bg-primary text-white p-4 z-200 md:hidden transition-transform duration-300 transform ${!isOpen ? "-translate-x-full" : "translate-x-0"
                        }`
                    }
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Admin Panel</h2>
                        <button onClick={toggle}>
                            <AiOutlineMenuUnfold className="text-2xl" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-4">
                        {menuItems.map(({ label, id, icon: Icon }) => (
                            <BotonItemAside
                                key={id}
                                id={id}
                                label={label}
                                Icon={<Icon />}
                                isOpen={false}
                                selected={selected}
                                handleClickSelected={handleClickSelected}
                            />
                        ))}
                        <div className="mt-auto">
                            <button
                                onClick={handleLogout}
                                className="group flex items-center gap-3 w-full p-3 rounded hover:bg-blue-900 transition"
                                aria-label={label}
                                title={label}
                                type="button"
                            >
                                <span className="text-2xl">
                                    <IconLogout />
                                </span>
                                <span className="truncate">{label}</span>
                            </button>
                        </div>
                    </nav>
                </aside >
            }

            {/* Menú escritorio */}
            < aside className={`hidden md:flex transition-all duration-300 bg-primary text-white p-4 h-screen flex-col ${isOpen ? "w-20" : "w-64"}`}>
                <div className="flex justify-between items-center mb-6 w-full">
                    {!isOpen && <h2 className="text-xl font-bold flex-1 truncate">Admin Panel</h2>}
                    <button
                        className="text-white text-xl p-2 cursor-pointer"
                        onClick={toggle}
                        title={isOpen ? "Expandir" : "Colapsar"}
                        aria-label={isOpen ? "Expandir" : "Colapsar"}
                    >
                        {isOpen ? <AiOutlineMenuUnfold className="text-2xl" /> : <AiOutlineMenuFold className="text-2xl" />}
                    </button>
                </div>

                <nav className="space-y-4 flex flex-col flex-grow">
                    {menuItems.map(({ label, id, icon: Icon }) =>
                        isOpen ? (
                            <Tooltip key={id} text={label} position="right">
                                <BotonItemAside
                                    id={id}
                                    label={label}
                                    Icon={<Icon />}
                                    isOpen={isOpen}
                                    selected={selected}
                                    handleClickSelected={handleClickSelected}
                                />
                            </Tooltip>
                        ) : (
                            <BotonItemAside
                                key={id}
                                id={id}
                                label={label}
                                Icon={<Icon />}
                                isOpen={isOpen}
                                selected={selected}
                                handleClickSelected={handleClickSelected}
                            />
                        )
                    )}

                    {/* Logout */}
                    <div className="mt-auto">
                        {isOpen ? (
                            <Tooltip text={label} position="right">
                                <button
                                    key={id}
                                    onClick={handleLogout}
                                    className="group flex cursor-pointer items-center gap-3 w-full text-left p-3 rounded hover:bg-blue-900 transition"
                                    aria-label={label}
                                    title={label}
                                    type="button"
                                >
                                    <span className="text-2xl">
                                        <IconLogout />
                                    </span>
                                    {!isOpen && <span className="truncate">{label}</span>}
                                </button>
                            </Tooltip>
                        ) : (
                            <button
                                key={id}
                                onClick={handleLogout}
                                className="group flex cursor-pointer items-center gap-3 w-full text-left p-3 rounded hover:bg-blue-900 transition"
                                aria-label={label}
                                title={label}
                                type="button"
                            >
                                <span className="text-2xl">
                                    <IconLogout />
                                </span>
                                {!isOpen && <span className="truncate">{label}</span>}
                            </button>
                        )}
                    </div>
                </nav>
            </aside >
        </>
    );
}
