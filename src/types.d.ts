export interface Servicio {
    name: string;
    description: string;
    img: string;
}

export interface LinksNavegacionProps {
    name: string;
    path: string;
    active: boolean;
}

export interface TooltipProps {
    text: string
    children: React.ReactNode
    position?: "top" | "bottom" | "left" | "right"
}
