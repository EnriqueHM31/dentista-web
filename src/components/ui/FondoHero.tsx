import ImagenAnimada from "../Hero/ImagenAnimada";

export default function FondoHero() {
    return (
        <section className="absolute inset-0 h-[140vh] md:h-screen w-full -z-30 bg-primary overflow-hidden">
            <div className="relative w-full h-full">
                <svg className="absolute left-0 bottom-0 z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" d="M0,32L60,32C120,32,240,32,360,74.7C480,117,600,203,720,240C840,277,960,267,1080,250.7C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                <ImagenAnimada />
            </div>

        </section>
    )
}