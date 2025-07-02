import { GrServices } from "react-icons/gr";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

import { RiLogoutCircleLine } from "react-icons/ri";

export function getIconosAside() {
    return [
        { label: 'Perfil', icon: AiOutlineUser, id: "perfil" },
        { label: 'Servicios', icon: GrServices, id: "servicios" },
        { label: 'Sociales', icon: IoShareSocialSharp, id: "share" },
        { label: 'Preguntas', icon: FaQuestionCircle, id: "faq" },
    ];
}


export function getIconoLogout() {
    return { label: "Cerrar sesión", icon: RiLogoutCircleLine, id: "logout" };

}