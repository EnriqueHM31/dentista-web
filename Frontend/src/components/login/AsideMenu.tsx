import { AiOutlineMenuFold, AiOutlineMenuUnfold, } from "react-icons/ai";
import Tooltip from "@/components/general/Tooltip";
import type { AsideMenuProps } from "@/types";
import { getIconosAside, getIconoLogout } from "@/components/general/ObjetosIconos";
import { useOpenWithTransition } from "@/hooks/general/useOpen";
import BotonItemAside from "./aside/BotonItemAside";


export default function AsideMenu({ selected, handleClickSelected }: AsideMenuProps) {
    const { isOpen, toggle } = useOpenWithTransition();
    const menuItems = getIconosAside();
    const { label, icon: Icon, id } = getIconoLogout();

    return (
        <aside
            className={`transition-all duration-300 bg-primary text-white p-4 h-screen flex flex-col ${isOpen ? "w-20" : "w-64"}`}
        >
            {/* Expand/Collapse */}
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

            {/* Main menu items */}
            <nav className="space-y-4 flex flex-col flex-grow">
                {menuItems.map(({ label, id, icon: Icon }) => {

                    return isOpen ? (
                        <Tooltip key={id} text={label} position="right">
                            <BotonItemAside
                                key={id}
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
                    );
                })}

                {/* Logout (siempre al final) */}
                <div className="mt-auto">
                    {(() => {

                        return isOpen ? (
                            <Tooltip text={label} position="right">
                                <BotonItemAside
                                    key={id}
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
                        );
                    })()}
                </div>
            </nav>
        </aside>
    )
}