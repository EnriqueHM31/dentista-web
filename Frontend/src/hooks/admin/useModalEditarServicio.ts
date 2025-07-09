import type { ServicioResponse } from "@/types";
import { useState } from "react";

export function useModalEditarServicio() {
    const [formValues, setFormValues] = useState<ServicioResponse>({ id: "", name: "", description: "", img: "" });

    const handleEdit = (servicio: ServicioResponse) => {
        setFormValues(servicio);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    return {
        formValues,
        handleEdit,
        handleChange,
    }


}