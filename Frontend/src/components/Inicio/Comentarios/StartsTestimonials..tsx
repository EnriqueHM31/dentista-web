import type { StartsTestimonialsProps } from "@/types/Comentarios/types";

export default function StartsTestimonials({ numero }: StartsTestimonialsProps) {

    return (
        <div className="flex gap-2 items-start">
            {
                Array.from({ length: numero }, (_, index) => (
                    <svg key={index} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-star fill-yellow-300 xl:size-4 size-4"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                ))
            }
        </div>
    )
}