import { useEffect, useRef } from "react";
import { useId } from "react";
import type { CarouselProps } from "@/types/Components/types";
import Slide from "@/components/Inicio/Carusel/Slide";
import CarouselControl from "@/components/Inicio/Carusel/CaruselControl";
import { useCarrusel } from "@/hooks/general/useCarrusel";


export default function Carousel({ slides }: CarouselProps) {
  const { current, handlePreviousClick, handleNextClick, handleSlideClick } = useCarrusel({ slides });
  const id = useId();

  // Refs para swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLUListElement | null>(null);

  // Swipe en móvil
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const deltaX = touchEndX.current - touchStartX.current;
      const threshold = 50; // mínimo de px para considerar swipe

      if (deltaX > threshold) {
        handlePreviousClick(); // swipe a la derecha
      } else if (deltaX < -threshold) {
        handleNextClick(); // swipe a la izquierda
      }

      touchStartX.current = 0;
      touchEndX.current = 0;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [handlePreviousClick, handleNextClick]);

  return (
    <section
      className="relative xl:w-[70vmin] xl:h-[70vmin]  w-full h-[80vh] py-4
       md:min-h-[75vh] mx-auto flex flex-col items-center justify-center"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        ref={containerRef}
        className="absolute flex md:mx-[-4vmin] transition-transform duration-200 ease-in-out w-full max-w-11/12 md:max-w-full"
        style={{
          transform: `translateX(-${current * (200 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      {/* Botones solo visibles en md o más */}
      <div className="hidden md:flex justify-center w-full top-[calc(100%+1rem)] absolute">
        <CarouselControl
          type="previous"
          title="Anterior"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Siguiente"
          handleClick={handleNextClick}
        />
      </div>
    </section>
  );
}
