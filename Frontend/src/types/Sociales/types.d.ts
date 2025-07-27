import { Dispatch, SetStateAction } from "react";
import type { UUID } from "../types";

export interface SocialesContextType {
    sociales: SocialProps[];
    setSociales: Dispatch<SetStateAction<SocialProps[]>>;
}

export interface SocialProps {
    id: UUID;
    nombre: string;
    referencia: string;
}

export type SocialEditarProps = {
    [key in UUID]: boolean;
};

export type FormSocialProps = Omit<SocialProps, "id">;

export type SocialesEditadasProps = Omit<SocialProps, 'nombre'>[]