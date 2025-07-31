import Modal from "@/components/General/Modal";
import { useModalIndependiente } from "@/hooks/general/useModalIndependiente";
import type { EspecialistaProps } from "@/types/Especialistas/types";
import type { UUID } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDingtalk, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface Props {
  slides: EspecialistaProps[];
}

export default function Carousel({ slides }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationFrame = useRef<number | null>(null);
  const positionRef = useRef(0);
  const [hoveredIndex, setHoveredIndex] = useState<UUID | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedEspecialista, setSelectedEspecialista] = useState<EspecialistaProps | null>(null);

  const { handleClickDesactivarModal, handleClickActivarModalIndependiente, activeModal } = useModalIndependiente();

  const duplicatedSlides = [...slides, ...slides, ...slides];
  const speed = 2;

  const animate = () => {
    const track = trackRef.current;
    if (!track || hoveredIndex !== null || isMobile) return;

    positionRef.current -= speed;
    const scrollLimit = track.scrollWidth / 2;

    if (scrollLimit + positionRef.current <= 0) {
      positionRef.current = 0;
    }

    track.style.transform = `translateX(${positionRef.current}px)`;
    animationFrame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);

      const track = trackRef.current;
      if (track && isNowMobile) {
        const cardWidth = 300;
        const gap = 16;
        const totalCard = cardWidth + gap;
        const initialOffset = (window.innerWidth - totalCard) / 2;

        positionRef.current = initialOffset;
        track.style.transform = `translateX(${positionRef.current}px)`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (!isMobile) {
      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [hoveredIndex, isMobile]);

  const handleMouseEnterCard = (id: UUID) => {
    if (!isMobile) {
      setHoveredIndex(id);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    }
  };

  const handleMouseLeaveCard = () => {
    setHoveredIndex(null);
    if (!isMobile) {
      animationFrame.current = requestAnimationFrame(animate);
    }
  };

  const handleClickCard = (slide: EspecialistaProps) => {
    handleClickActivarModalIndependiente("modal-especialista");
    setSelectedEspecialista(slide);
  };

  const handleCloseModal = () => {
    handleClickDesactivarModal();
    setSelectedEspecialista(null);
  };

  const handleManualScroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const distance = 300 + 16;
    positionRef.current += direction === "left" ? distance : -distance;

    const scrollLimit = track.scrollWidth / 2;
    if (scrollLimit + positionRef.current <= 0) {
      positionRef.current = 0;
    }

    track.style.transform = `translateX(${positionRef.current}px)`;
  };

  return (
    <section className="relative overflow-hidden w-full h-full flex items-center md:justify-center">
      {isMobile && (
        <div className="absolute z-10 bottom-0 w-full flex justify-center gap-4 px-2">
          <button
            onClick={() => handleManualScroll("left")}
            className="bg-white p-2 rounded-full shadow"
          >
            <AiOutlineLeft size={24} />
          </button>
          <button
            onClick={() => handleManualScroll("right")}
            className="bg-white p-2 rounded-full shadow"
          >
            <AiOutlineRight size={24} />
          </button>
        </div>
      )}

      <div
        ref={trackRef}
        className={`flex w-fit gap-4 items-center transition-transform duration-100 ${!isMobile ? "pl-[calc(100%-175px)]" : ""}`}
        style={{ willChange: "transform" }}
      >
        {duplicatedSlides.map((slide, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[300px] md:w-[350px] h-auto md:h-[350px] bg-white rounded-xl shadow-lg p-1 cursor-pointer group relative flex items-center justify-center"
            onMouseEnter={() => handleMouseEnterCard(slide.id)}
            onMouseLeave={handleMouseLeaveCard}
          >
            <picture className="w-full h-full rounded-md overflow-hidden">
              <img
                src={slide.avatar}
                alt={slide.nombre}
                className={`w-full h-full object-cover transition-all duration-300 rounded-md ${hoveredIndex !== null && hoveredIndex !== slide.id
                  ? "grayscale"
                  : "grayscale-0"
                  }`}
              />
            </picture>

            <article className={`absolute inset-0 flex items-end justify-end bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100`}>
              <div className="flex flex-col items-center justify-center gap-2 p-4 w-full max-w-full mx-auto bg-white rounded-bl-lg rounded-br-lg">
                <div className="flex-[3] flex gap-6 w-full items-center">
                  <AiOutlineDingtalk className="text-4xl" />
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-start">{slide.nombre}</h2>
                    <p className="text-sm text-start">{slide.servicio}</p>
                    <p className="text-sm text-start">{slide.email}</p>
                  </div>
                </div>
              </div>
            </article>

            {isMobile && (
              <div className="absolute top-4 right-7 p-1">
                <button
                  onClick={() => handleClickCard(slide)}
                  className="rounded-full text-white bg-primary size-10 border border-transparent text-xs flex justify-center items-center hover:shadow-lg transition"
                >
                  <AiOutlineDingtalk className="text-2xl" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal solo en móviles */}
      <Modal
        activeId={activeModal as string}
        onClose={handleCloseModal}
        modalId={'modal-especialista'}
        clases="max-w-11/12"
      >
        <div className=" rounded-xl w-full relative pb-6 flex items-center justify-center flex-col  mx-auto">

          <img
            src={selectedEspecialista?.avatar}
            alt={selectedEspecialista?.nombre}
            className="w-full h-auto object-cover rounded-tl-xl rounded-tr-xl mb-4"
          />

          <div className="flex flex-col gap-2  px-4 w-full">
            <h2 className="text-xl font-bold">{selectedEspecialista?.nombre}</h2>
            <p className="text-sm text-gray-700 mt-1">Especialista en {selectedEspecialista?.servicio}</p>
            <p className="text-sm text-white mt-1 bg-primary py-3 rounded px-4 w-fit ">{selectedEspecialista?.email}</p>
          </div>
        </div>
      </Modal>
    </section>
  );
}
