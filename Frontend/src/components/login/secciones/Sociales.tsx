import { FaEdit, FaSave } from 'react-icons/fa';
import { getIconosSociales } from "@/components/General/ObjetosIconos";
import { useSociales } from '@/hooks/admin/Sociales/useSociales';


export default function Sociales() {

    const { SocialEdit, handleEditClick, handleChange, handleEditarRedSocial, editMode } = useSociales();


    return (
        <div className="max-w-2xl bg-white rounded-xl md:p-8 py-8 px-4 space-y-8 shadow ">
            <h2 className="text-2xl font-semibold text-primary text-center md:text-left">Redes Sociales y Contacto</h2>

            {SocialEdit.map(({ id, nombre, referencia }) => (
                <div key={id} className="flex flex-col md:flex-row items-start md:items-center gap-3 relative">
                    <div className="text-xl flex gap-4 items-center flex-1">
                        {getIconosSociales().find((i) => i.label.toLowerCase() === nombre.toLowerCase())?.icon}
                        <p className="text-lg">{nombre}</p>
                    </div>
                    <input
                        type="text"
                        disabled={!editMode[id as keyof typeof editMode]}
                        value={referencia}
                        id={id}
                        onChange={(e) => handleChange(id, e.target.value)}
                        className={`flex-2 border rounded-lg px-3 py-2 w-full focus:outline-none transition  ${editMode[id as keyof typeof editMode]
                            ? 'border-primary text-primary bg-white'
                            : 'border-gray-300 bg-gray-100 text-gray-500'
                            }`}
                    />
                    <button
                        onClick={() => handleEditClick(id)}
                        className="text-primary hover:text-blue-700 cursor-pointer absolute right-0 top-1 md:relative"
                        title={editMode[id as keyof typeof editMode] ? 'Bloquear' : 'Editar'}
                        aria-label={editMode[id as keyof typeof editMode] ? 'Bloquear' : 'Editar'}
                    >
                        <FaEdit />
                    </button>
                </div>
            ))}

            <button
                onClick={handleEditarRedSocial}
                className="bg-primary cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mt-5 mx-auto md:mx-0"
                type="button"
            >
                <FaSave />
                Guardar cambios
            </button>
        </div>
    );
}
