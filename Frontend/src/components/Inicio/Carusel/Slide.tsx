import { AiOutlineDingtalk } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import type { SlideProps } from "@/types";

export default function Slide({ slide, index, current, handleSlideClick }: SlideProps) {
    const { nombre, apellido, email, telefono, avatar, linkedin, servicio } = slide;


    return (
        <div className="">
            <li
                className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out xl:w-[70vmin] scale-75 w-[90vmin] h-[70vh] xl:h-[70vmin] mx-[4vmin] z-10  border border-white rounded-2xl"
                onClick={() => handleSlideClick(index)}
                style={{
                    transform: current !== index ? "scale(0.7)" : "scale(1.2)",
                    transition: "transform 0.5s ease-in-out",
                    transformOrigin: "bottom center",
                }}
            >
                <div
                    className={` absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden transition-all duration-100 ease-out border border-primary shadow-xl `}

                >
                    <img
                        className="absolute inset-0 xl:w-[120%] xl:h-[120%] h-full object-cover opacity-100 transition-opacity duration-100 ease-in-out"

                        alt={`${nombre} ${apellido}`}
                        src={avatar}
                    />
                    <div className={`absolute inset-0  ${current === index ? "bg-transparent" : "bg-black/30"}`}>

                    </div>
                    {current === index && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute inset-0 transition-all duration-100 flex items-end justify-center"
                        >
                            <article className="flex gap-6 items-center bg-primary px-4 py-4 w-full">
                                <AiOutlineDingtalk className="text-4xl md:text-4xl xl:text-5xl relative" />
                                <div className="flex flex-col gap-1 items-start w-full">
                                    <h2 className="text-md md:text-xl lg:text-2xl font-semibold relative text-start">
                                        {servicio}
                                    </h2>
                                    <div className="flex  gap-1 items-start justify-between w-full">

                                        <p className="text-xs md:text-sm lg:text-base text-start">
                                            {email}
                                        </p>

                                        <p className="text-xs md:text-sm lg:text-base text-start">
                                            {telefono}
                                        </p>
                                    </div>
                                </div>
                            </article>
                            <div className="absolute top-4 right-4 p-1 rounded-full text-white bg-primary size-12 border border-transparent text-xs flex justify-center items-center hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                                <FaLinkedin className="text-2xl" />
                            </div>
                        </a>
                    )}
                </div>
            </li >
        </div >
    );
}
