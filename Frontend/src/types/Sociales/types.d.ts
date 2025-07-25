
export interface SocialesContextType {
    sociales: SocialProps[];
    setSociales: React.Dispatch<React.SetStateAction<SocialProps[]>>;
}

export interface SocialProps {
    id: string;
    nombre: string;
    referencia: string;
}

export type SocialEditarProps = {
    [key in `${string}-${string}-${string}-${string}-${string}`]: boolean;
};