import type { CitaFormProps } from "@/types/Citas/types";
import { ObtenerFechaActualMasUno } from "@/utils/Hora";



export const INITIAL_FORM_CITA: CitaFormProps = {
    nombre: "",
    email: "",
    telefono: "",
    fecha: ObtenerFechaActualMasUno(),
    servicio: "",
    hora: "",
    comentarios: "",
}