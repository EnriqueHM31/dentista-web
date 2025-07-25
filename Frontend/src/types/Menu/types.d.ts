
export interface LinksNavegacionProps {
    name: string;
    path: string;
    active: boolean;
}

export interface MenuNavegacionProps {
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

export interface AsideMenuProps {
    selected: DATA_STATUS_SELECTED[keyof typeof DATA_STATUS_SELECTED]
    handleClickSelected: (id: DATA_STATUS_SELECTED[keyof typeof DATA_STATUS_SELECTED]) => void
}


// LOGIN ----------------------------------------------

export interface BotonItemAsideProps {
    id: string;
    label: string;
    Icon: React.ReactNode;
    isOpen: boolean;
    selected: string;
    handleClickSelected: (id: string) => void;
}