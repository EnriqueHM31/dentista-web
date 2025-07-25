
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
    selected: DATA_STATUS_SELECTED[keyof typeof DATA_STATUS_SELECTED]
    handleClickSelected: (id: DATA_STATUS_SELECTED[keyof typeof DATA_STATUS_SELECTED]) => void
}


// LOGIN ----------------------------------------------

interface BotonItemAsideProps {
    id: string;
    label: string;
    Icon: React.ReactNode;
    isOpen: boolean;
    selected: string;
    handleClickSelected: (id: string) => void;
}