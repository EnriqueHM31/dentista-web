
export interface LinksNavegacionProps {
    name: string;
    path: string;
    active: boolean;
}

interface MenuNavegacionProps {
    isOpen: boolean;
    toggleMenu: () => void;
    clases: {
        textColor: string;
        buttonClasses: string;
        buttonMovilClasses: string;
        menubackground: string;
        BackgrounAfter: string;
        hoverColor: string;
    };
}

interface AsideMenuProps {
    selected: string
    handleClickSelected: (id: string) => void
}
