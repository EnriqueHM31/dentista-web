import StartsTestimonials from "./StartsTestimonials.";

interface TestimonioProps {
    client_name: string;
    rating: number;
    comment: string;
    index: number;
}


export default function Testimonio({ client_name, rating, comment, index }: TestimonioProps) {
    function getRandomPortraitUrl(index: number) {
        const gender = Math.random() < 0.5 ? "men" : "women";
        return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
    }




    return (

        <li className="flex flex-col gap-3  px-8 py-4 bg-primary text-white rounded-2xl min-h-[30dvh] justify-between "
        >
            <div className="flex-1 flex items-center gap-4 ">
                <img src={getRandomPortraitUrl(index)} alt="cliente" className="size-10 rounded-full object-cover" />

                <div className="flex flex-col gap-2">
                    <h2 className=" text-md md:text-xl xl:text-xl font-bold">{client_name}</h2>
                    <StartsTestimonials numero={rating} />
                </div>
            </div>
            <div className="flex-1 text-start">
                <p>{comment}</p>
            </div>
        </li >
    )
}


