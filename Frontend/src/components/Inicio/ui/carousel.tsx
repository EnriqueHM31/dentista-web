import { useId } from "react";
import type { Especialista } from "@/types";
import Slide from "@/components/Inicio/Carusel/Slide";
import CarouselControl from "@/components/Inicio/Carusel/CaruselControl";
import { useCarrusel } from "@/hooks/general/useCarrusel";

interface CarouselProps {
  slides: Especialista[];
}

export default function Carousel({ slides }: CarouselProps) {
  const { current, handlePreviousClick, handleNextClick, handleSlideClick } = useCarrusel({ slides });
  const id = useId();

  return (
    <div
      className="relative xl:w-[70vmin] xl:h-[70vmin] w-full   min-h-[75vh] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-200 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
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

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
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
    </div>
  );
}
