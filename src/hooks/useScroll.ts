import { useEffect, useState } from "react";

export function useScroll() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight - 100);
        };


        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        window.addEventListener("orientationchange", handleScroll);
        window.addEventListener("load", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    const textColor = scrolled ? "text-black" : "text-white";
    const buttonClasses = scrolled
        ? "bg-primary text-white"
        : "bg-white text-primary";
    const buttonMovilClasses = scrolled
        ? "bg-white text-primary"
        : "bg-primary text-white";
    const menubackground = scrolled
        ? "bg-primary text-white"
        : "bg-white text-black";
    const clasesLogoIcono = scrolled ? "text-primary" : "text-white";
    const clasesLogoText = scrolled ? "text-black" : "text-white";
    const BackgrounAfter = scrolled ? "after:bg-primary" : "after:bg-white";
    const hoverColor = !scrolled ? "hover:text-white/70" : "hover:text-black/70";

    return {
        textColor,
        buttonClasses,
        buttonMovilClasses,
        menubackground,
        BackgrounAfter,
        hoverColor,
        scrolled,
        clasesLogoIcono,
        clasesLogoText
    }
}   
