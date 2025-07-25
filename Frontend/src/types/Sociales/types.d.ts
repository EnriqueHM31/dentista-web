import { Dispatch, SetStateAction } from "react";

export interface SocialesContextType {
    sociales: SocialProps[];
    setSociales: Dispatch<SetStateAction<SocialProps[]>>;
}

export interface SocialProps {
    id: string;
    nombre: string;
    referencia: string;
}

export type SocialEditarProps = {
    [key in `${string}-${string}-${string}-${string}-${string}`]: boolean;
};