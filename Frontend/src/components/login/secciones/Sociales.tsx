import { FaEdit, FaSave } from 'react-icons/fa';
import { getIconosSociales } from "@/components/General/ObjetosIconos";
import { useSociales } from '@/hooks/admin/Sociales/useSociales';


export default function Sociales() {
    const { sociales, handleEditClick, handleChange, handleEditarRedSocial, editMode } = useSociales();


    return (
        <div className="max-w-2xl bg-white rounded-xl p-8 space-y-8 shadow">
            <h2 className="text-2xl font-semibold text-primary">Redes Sociales y Contacto</h2>

            {sociales.map(({ id, nombre, referencia }) => (
                <div key={id} className="flex items-center gap-3">
                    <div className="text-xl flex gap-4 items-center flex-1">
                        {getIconosSociales().find((i) => i.label.toLowerCase() === nombre.toLowerCase())?.icon}
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
                onClick={handleEditarRedSocial}
                className="bg-primary cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mt-5"
                type="button"
            >
                <FaSave />
                Guardar cambios
            </button>
        </div>
    );
}
