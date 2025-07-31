import { getIconosSociales } from "@/components/General/ObjetosIconos";
import { useSociales } from '@/hooks/admin/Sociales/useSociales';
import { FaEdit, FaSave } from 'react-icons/fa';


export default function Sociales() {

    const { SocialEdit, handleEditClick, handleChange, handleEditarRedSocial, editMode } = useSociales();

    return (
        <div className="max-w-full bg-white rounded-xl md:p-8 py-0 px-4 space-y-8 shadow ">

            <header className="flex flex-col gap-4 md:gap-8 md:flex-row items-center justify-between w-full max-w-3xl ">
                <h2 className="text-3xl font-semibold capitalize text-primary text-center md:text-left">Redes Sociales y Contacto</h2>
                <button
                    onClick={handleEditarRedSocial}
                    className="bg-primary cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2  mx-auto md:mx-0"
                    type="button"
                >
                    <FaSave />
                    Guardar cambios
                </button>
            </header>
            <section className="flex flex-col gap-8 max-w-3xl">

                {SocialEdit.map(({ id, nombre, referencia }) => (
                    <div key={id} className="flex flex-col md:flex-row items-start  md:items-center gap-6 relative">
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
                            className={`flex-3 border-2 rounded-lg px-3 py-2 w-full focus:outline-none transition  ${editMode[id as keyof typeof editMode]
                                ? 'border-green-500 text-primary bg-green-300'
                                : 'border-gray-500 bg-gray-100 text-gray-500'
                                }`}
                        />
                        <button
                            onClick={() => handleEditClick(id)}
                            className="text-primary hover:text-blue-700 cursor-pointer absolute right-0 top-1 md:static"
                            title={editMode[id as keyof typeof editMode] ? 'Bloquear' : 'Editar'}
                            aria-label={editMode[id as keyof typeof editMode] ? 'Bloquear' : 'Editar'}
                        >
                            <FaEdit className="text-xl" />
                        </button>
                    </div>
                ))}

            </section>

        </div>
    );
}
