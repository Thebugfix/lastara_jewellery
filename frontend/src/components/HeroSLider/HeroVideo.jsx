import { useEffect, useRef, useState } from "react";
import api from "../../lib/api";

// Fallback data in case API fails
const FALLBACK_VIDEO = {
  videoUrl: "/src/assets/HeroVideo.mp4",
  poster: "https://cdn.dribbble.com/userupload/15927605/file/original-4fe0925ab3151904c2adcbb21c350567.png?resize=1024x205&vertical=center"
};

export default function HeroVideo() {
  const [videoData, setVideoData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // Fetch video data from API
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/hero-video");
        if (response.data) {
          setVideoData(response.data);
        } else {
          setVideoData(FALLBACK_VIDEO);
        }
      } catch (err) {
        console.error("Error fetching video data:", err);
        setError("Failed to load video content");
        setVideoData(FALLBACK_VIDEO);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full h-[70vh] bg-gray-100">
        <div className="animate-pulse w-full h-full bg-gray-200" />
      </div>
    );
  }

  // Use videoData or fallback
  const currentVideo = videoData || FALLBACK_VIDEO;

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Video Element */}
      <div className="relative w-full h-full">
        {error ? (
          // Fallback image if there's an error with the video
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${currentVideo.poster})` }}
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            // poster={currentVideo.poster}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={currentVideo.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}