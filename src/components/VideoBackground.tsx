import { useEffect, useRef, useState, useCallback } from "react";

interface VideoBackgroundProps {
  video: string;
  image: string;
  name: string;
  className?: string;
}

const VideoBackground = ({ video, image, name, className = "" }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch((err) => console.warn(`[Video] ${name} play failed:`, err));
  }, [name]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    tryPlay();
    const onLoaded = () => {
      setVideoLoaded(true);
      tryPlay();
    };
    v.addEventListener("loadeddata", onLoaded);
    return () => v.removeEventListener("loadeddata", onLoaded);
  }, [tryPlay]);

  return (
    <>
      <img
        src={image}
        alt={name}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover ken-burns ${videoLoaded ? "opacity-0" : "opacity-100"} ${className}`}
        style={{ zIndex: 0, transition: "opacity 0.5s ease" }}
      />
      <video
        ref={videoRef}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        preload="auto"
        poster={image}
        className={`absolute inset-0 w-full h-full object-cover ${videoLoaded ? "opacity-100" : "opacity-0"} ${className}`}
        style={{ zIndex: 1, transition: "opacity 0.5s ease" }}
        src={video}
        onError={() => console.warn(`[Video] ${name} failed to load`)}
      />
    </>
  );
};

export default VideoBackground;
