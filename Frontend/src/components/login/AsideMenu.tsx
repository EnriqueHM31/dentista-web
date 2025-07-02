import { useState } from "react";
import {
    AiOutlineUser,
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
} from "react-icons/ai";
import { GrServices } from "react-icons/gr";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import Tooltip from "@/components/general/Tooltip";
import type { AsideMenuProps } from "@/types";

const menuItems = [
    { label: "Perfil", icon: <AiOutlineUser />, id: "perfil" },
    { label: "Servicios", icon: <GrServices />, id: "servicios" },
    { label: "Sociales", icon: <IoShareSocialSharp />, id: "share" },
    { label: "Preguntas", icon: <FaQuestionCircle />, id: "faq" },
];
const logoutItem = { label: "Cerrar sesión", icon: <RiLogoutCircleLine />, id: "logout" };



export default function AsideMenu({ selected, handleClickSelected }: AsideMenuProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

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
                {menuItems.map((item) => {
                    const button = (
                        <button
                            key={item.id}
                            onClick={() => handleClickSelected(item.id)}
                            className={`group flex cursor-pointer items-center gap-3 w-full text-left p-3 rounded hover:bg-blue-900 transition ${selected === item.id ? "bg-blue-900" : ""
                                }`}
                            aria-label={item.label}
                            title={item.label}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            {!isCollapsed && <span className="truncate">{item.label}</span>}
                        </button>
                    );

                    return isCollapsed ? (
                        <Tooltip key={item.id} text={item.label} position="right">
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
                                onClick={() => handleClickSelected(logoutItem.id)}
                                className={`group flex cursor-pointer items-center gap-3 w-full text-left p-3 rounded hover:bg-blue-900 transition ${selected === logoutItem.id ? "bg-blue-900" : ""
                                    }`}
                                aria-label={logoutItem.label}
                                title={logoutItem.label}
                            >
                                <span className="text-2xl">{logoutItem.icon}</span>
                                {!isCollapsed && <span className="truncate">{logoutItem.label}</span>}
                            </button>
                        );
                        return isCollapsed ? (
                            <Tooltip text={logoutItem.label} position="right">
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