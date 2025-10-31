import { useEffect, useState, useRef, useCallback } from "react";
import { useSwipeable } from 'react-swipeable';
import api from "../../lib/api";

const FALLBACK_SLIDES = [
  { 
    image: { 
      url: "https://cdn.dribbble.com/userupload/15927605/file/original-4fe0925ab3151904c2adcbb21c350567.png?resize=1024x205&vertical=center",
      title: "Elegant Gold Collection",
      subtitle: "Discover our latest designs"
    },
    title: "Elegant Gold Collection",
    subtitle: "Discover our latest designs",
    buttonText: "Shop Now",
    buttonLink: "/collections/gold"
  },
  { 
    image: { 
      url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1600&auto=format&fit=crop",
      title: "Diamond Treasures",
      subtitle: "Timeless beauty in every piece"
    },
    title: "Diamond Treasures",
    subtitle: "Timeless beauty in every piece",
    buttonText: "Explore",
    buttonLink: "/collections/diamonds"
  },
  { 
    image: { 
      url: "https://cdn.dribbble.com/userupload/7750134/file/original-e5d816193524f1a5cbb813f7304ea322.jpg?resize=1024x373&vertical=center",
      title: "Luxury Craftsmanship",
      subtitle: "Handcrafted to perfection"
    },
    title: "Luxury Craftsmanship",
    subtitle: "Handcrafted to perfection",
    buttonText: "View Collection",
    buttonLink: "/collections/luxury"
  },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Fetch slides from API or use fallback
  useEffect(() => {
    let isMounted = true;
    
    const fetchSlides = async () => {
      try {
        const response = await api.get("/api/hero");
        if (isMounted && response?.data?.length) {
          setSlides(response.data);
        } else {
          setSlides(FALLBACK_SLIDES);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        if (isMounted) setSlides(FALLBACK_SLIDES);
      }
    };

    fetchSlides();
    return () => {
      isMounted = false;
      clearInterval(timerRef.current);
    };
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timerRef.current);
  }, [slides.length, isHovered]);

  // Handle manual navigation
  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    resetTimer();
  }, [slides.length]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 3000);
  }, [slides.length]);

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left - go to previous slide
      goToSlide((currentIndex - 1 + slides.length) % slides.length);
    }

    if (touchStartX - touchEndX < -50) {
      // Swipe right - go to next slide
      goToSlide((currentIndex + 1) % slides.length);
    }
  };

  // Swipeable configuration
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToSlide((currentIndex - 1 + slides.length) % slides.length),
    onSwipedRight: () => goToSlide((currentIndex + 1) % slides.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  if (!slides.length) return null;

  const currentSlide = slides[currentIndex];

  return (
    <section 
      className="relative w-full h-[90vh] md:h-[90vh] max-sm:h-[80vh] overflow-hidden group touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Featured jewellery collection"
      {...swipeHandlers}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Image */}
      <div 
        className="w-full h-full bg-cover bg-center transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${currentSlide.image?.url || currentSlide.url})`,
          opacity: 1
        }}
      >
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light mb-4 animate-fadeIn">
              {currentSlide.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              {currentSlide.subtitle}
            </p>
            {currentSlide.buttonText && (
              <a 
                href={currentSlide.buttonLink} 
                className="inline-block px-8 py-3 bg-[#c9a341] text-white font-medium rounded-sm hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                {currentSlide.buttonText}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white w-8' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => {
              setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
              resetTimer();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => {
              setCurrentIndex(prev => (prev + 1) % slides.length);
              resetTimer();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}