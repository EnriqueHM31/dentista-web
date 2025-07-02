import { useEffect, useState } from 'react';
import {
    FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaEdit, FaSave
} from 'react-icons/fa';
import { toast } from 'sonner';
import type { SocialProps } from "@/types";


export default function Sociales() {
    const [formData, setFormData] = useState<SocialProps[]>([]);
    const [originalData, setOriginalData] = useState<SocialProps[]>([]);
    const [editMode, setEditMode] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const obtenerDatosSociales = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/sociales`);
                const { message } = await res.json();
                if (!Array.isArray(message)) {
                    throw new Error('El formato recibido no es un arreglo');
                }
                setFormData(message);
                setOriginalData(message);
            } catch (err) {
                console.error(err);
                toast.error('Error al cargar redes sociales');
            }
        };

        obtenerDatosSociales();
    }, []);

    const handleEditClick = (id: string) => {
        setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleChange = (id: string, value: string) => {
        setFormData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, referencia: value } : item
            )
        );
    };

    const handleGuardar = async () => {
        const cambios = formData.filter((item) => {
            const original = originalData.find((o) => o.id === item.id);
            return original && original.referencia !== item.referencia;
        });

        if (cambios.length === 0) {
            toast.info('No hay cambios para guardar');
            return;
        }

        try {
            for (const cambio of cambios) {
                await fetch(`${import.meta.env.VITE_API_URL}/sociales/${cambio.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ referencia: cambio.referencia }),
                });
            }

            toast.success('Cambios guardados exitosamente');
            setOriginalData([...formData]);
            setEditMode({});
        } catch (error) {
            console.error('Error al guardar cambios', error);
            toast.error('Error al guardar los cambios');
        }
    };

    const iconos = [
        { label: 'Facebook', icon: <FaFacebook className="text-blue-600" /> },
        { label: 'LinkedIn', icon: <FaLinkedin className="text-blue-700" /> },
        { label: 'Instagram', icon: <FaInstagram className="text-pink-600" /> },
        { label: 'Twitter', icon: <FaTwitter className="text-sky-500" /> },
        { label: 'Telefono', icon: <FaPhone className="text-green-600" /> },
        { label: 'Correo', icon: <FaEnvelope className="text-red-600" /> },
        { label: 'Direccion', icon: <FaMapMarkerAlt className="text-purple-600" /> },
    ];

    return (
        <div className="max-w-2xl bg-white rounded-xl p-8 space-y-8 shadow">
            <h2 className="text-2xl font-semibold text-primary">Redes Sociales y Contacto</h2>

            {formData.map(({ id, nombre, referencia }) => (
                <div key={id} className="flex items-center gap-3">
                    <div className="text-xl flex gap-4 items-center flex-1">
                        {iconos.find((i) => i.label.toLowerCase() === nombre.toLowerCase())?.icon}
                        <p className="text-lg">{nombre}</p>
                    </div>
                    <input
                        type="text"
                        disabled={!editMode[id]}
                        value={referencia}
                        id={id}
                        onChange={(e) => handleChange(id, e.target.value)}
                        className={`flex-2 border rounded-lg px-3 py-2 w-full focus:outline-none transition ${editMode[id]
                            ? 'border-primary text-primary bg-white'
                            : 'border-gray-300 bg-gray-100 text-gray-500'
                            }`}
                    />
                    <button
                        onClick={() => handleEditClick(id)}
                        className="text-primary hover:text-blue-700 cursor-pointer"
                        title={editMode[id] ? 'Bloquear' : 'Editar'}
                        aria-label={editMode[id] ? 'Bloquear' : 'Editar'}
                    >
                        <FaEdit />
                    </button>
                </div>
            ))}

            <button
                onClick={handleGuardar}
                className="bg-primary cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mt-5"
                type="button"
            >
                <FaSave />
                Guardar cambios
            </button>
        </div>
    );
}
