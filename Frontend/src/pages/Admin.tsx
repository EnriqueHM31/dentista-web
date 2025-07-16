import Formulario from '@/components/login/InicioSesion/Formulario'
import LOGIN from '@/assets/img/login.jpg'

export default function Admin() {
    return (
        <>
            <div className='absolute w-full h-screen inset-0 bg-gradient-to-b to-black/60 from-black/40 -z-10'>
            </div>
            <img src={LOGIN} alt="Imagen de fondo del login" className='w-full h-screen  object-cover -z-20 absolute inset-0 ' />
            <Formulario />
        </>
    )
}