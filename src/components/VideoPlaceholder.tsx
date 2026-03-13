import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface VideoPlaceholderProps {
  caption: string;
  placeholderText: string;
  videoUrl?: string; // YouTube, Vimeo, or MP4 URL — leave empty for placeholder
}

const VideoPlaceholder = ({ caption, placeholderText, videoUrl }: VideoPlaceholderProps) => {
  const [playing, setPlaying] = useState(false);

  const getEmbedUrl = (url: string) => {
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    // Direct MP4
    return url;
  };

  const isMp4 = videoUrl?.endsWith(".mp4");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="max-w-[800px] mx-auto"
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          aspectRatio: "16 / 9",
          boxShadow: "0 8px 30px -10px rgba(0,0,0,0.15)",
        }}
        onClick={() => videoUrl && setPlaying(true)}
      >
        {playing && videoUrl ? (
          isMp4 ? (
            <video
              src={videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              controls
            />
          ) : (
            <iframe
              src={getEmbedUrl(videoUrl)}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Video"
            />
          )
        ) : (
          <>
            {/* Thumbnail / placeholder */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1B2150, #0a0d24)" }}
            >
              <span className="text-white/30 text-sm font-medium mb-2">
                {placeholderText}
              </span>
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <Play
                  size={26}
                  className="ml-1"
                  style={{ color: "#2EC4B6" }}
                  fill="#2EC4B6"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <p className="text-center text-gray-500 text-sm italic mt-4">{caption}</p>
    </motion.div>
  );
};

export default VideoPlaceholder;
