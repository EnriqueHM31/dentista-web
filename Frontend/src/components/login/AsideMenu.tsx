import { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold, } from "react-icons/ai";
import Tooltip from "@/components/general/Tooltip";
import type { AsideMenuProps } from "@/types";
import { getIconosAside, getIconoLogout } from "@/components/general/ObjetosIconos";


export default function AsideMenu({ selected, handleClickSelected }: AsideMenuProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = getIconosAside();
    const { label, icon: Icon, id } = getIconoLogout();

    return (
        <aside
            className={`transition-all duration-300 bg-primary text-white p-4 flex flex-col ${isCollapsed ? "w-20" : "w-64"}`}
        >
            {/* Expand/Collapse */}
            <div className="flex justify-between items-center mb-6 w-full">
                {!isCollapsed && <h2 className="text-xl font-bold flex-1 truncate">Admin Panel</h2>}
                <button
                    className="text-white text-xl p-2 cursor-pointer"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    title={isCollapsed ? "Expandir" : "Colapsar"}
                    aria-label={isCollapsed ? "Expandir" : "Colapsar"}
                >
                    {isCollapsed ? <AiOutlineMenuUnfold className="text-2xl" /> : <AiOutlineMenuFold className="text-2xl" />}
                </button>
            </div>

            {/* Main menu items */}
            <nav className="space-y-4 flex flex-col flex-grow">
                {menuItems.map(({ label, id, icon: Icon }) => {
                    const button = (
                        <button
                            key={id}
                            onClick={() => handleClickSelected(id)}
                            className={`group flex cursor-pointer -center gap-3 w-full text-left p-3 rounded hover:bg-blue-900 transition ${selected === id ? "bg-blue-900" : ""
                                }`}
                            aria-label={label}
                            title={label}
                        >
                            <span className="text-2xl"><Icon /></span>
                            {!isCollapsed && <span className="truncate">{label}</span>}
                        </button>
                    );

                    return isCollapsed ? (
                        <Tooltip key={id} text={label} position="right">
                            {button}
                        </Tooltip>
                    ) : (
                        button
                    );
                })}

                {/* Logout (siempre al final) */}
                <div className="mt-auto">
                    {(() => {
                        const button = (
                            <button
                                onClick={() => handleClickSelected(id)}
                                className={`group flex cursor-pointer items-center gap-3 w-full text-left p-3 rounded hover:bg-blue-900 transition ${selected === id ? "bg-blue-900" : ""
                                    }`}
                                aria-label={label}
                                title={label}
                            >
                                <span className="text-2xl">{<Icon />}</span>
                                {!isCollapsed && <span className="truncate">{label}</span>}
                            </button>
                        );
                        return isCollapsed ? (
                            <Tooltip text={label} position="right">
                                {button}
                            </Tooltip>
                        ) : (
                            button
                        );
                    })()}
                </div>
            </nav>
        </aside>
    )
}