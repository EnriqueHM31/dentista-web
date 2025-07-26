import type { SocialProps } from "@/types/Sociales/types";

export function ExistenModificacionesSociales({ SocialEdit, originalSocialRef }: { SocialEdit: SocialProps[], originalSocialRef: React.RefObject<SocialProps[]> }) {
    return SocialEdit.filter((item) => {
        const original = originalSocialRef.current.find((o) => o.id === item.id);
        return original && original.referencia !== item.referencia;
    });
}