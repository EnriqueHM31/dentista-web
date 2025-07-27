interface ServicioProps {
    titulo: string;
    descripcion: string;
    img: string;
    duration: number;
}

export type ServicioCrearProps = Partial<Servicio>;