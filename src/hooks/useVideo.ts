import { useRef, useState } from "react";

export default function useVideo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleEnd = () => {
        setIsPlaying(false);
    }

    return { isPlaying, handlePlay, handleEnd, videoRef };
}