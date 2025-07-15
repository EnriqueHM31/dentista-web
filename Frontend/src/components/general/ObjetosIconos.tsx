import { GrServices } from "react-icons/gr";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaComment } from "react-icons/fa6";
import {
    FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa';

export function getIconosAside() {
    return [
        { label: 'Perfil', icon: AiOutlineUser, id: "perfil" },
        { label: 'Especialistas', icon: AiOutlineUser, id: "especialistas" },
        { label: 'Servicios', icon: GrServices, id: "servicios" },
        { label: 'Sociales', icon: IoShareSocialSharp, id: "share" },
        { label: 'Preguntas', icon: FaQuestionCircle, id: "faq" },
        { label: 'Comentarios', icon: FaComment, id: "comentarios" },

    ];
}


export function getIconoLogout() {
    return { label: "Cerrar sesión", icon: RiLogoutCircleLine, id: "logout" };

}


export function getIconosSociales() {

    return [
        { label: 'Facebook', icon: <FaFacebook className="text-blue-600" /> },
        { label: 'LinkedIn', icon: <FaLinkedin className="text-blue-700" /> },
        { label: 'Instagram', icon: <FaInstagram className="text-pink-600" /> },
        { label: 'Twitter', icon: <FaTwitter className="text-sky-500" /> },
        { label: 'Telefono', icon: <FaPhone className="text-green-600" /> },
        { label: 'Correo', icon: <FaEnvelope className="text-red-600" /> },
        { label: 'Direccion', icon: <FaMapMarkerAlt className="text-purple-600" /> },
    ];
}