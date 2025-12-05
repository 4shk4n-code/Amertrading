"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const bannerImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=600&fit=crop&q=80",
    alt: "Modern warehouse facility",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=600&fit=crop&q=80",
    alt: "Shipping containers and logistics",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1920&h=600&fit=crop&q=80",
    alt: "Cargo ships and port operations",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=600&fit=crop&q=80",
    alt: "Warehouse distribution center",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=600&fit=crop&q=80",
    alt: "Global trading operations",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=600&fit=crop&q=80",
    alt: "Freight trucks and transportation",
  },
];

export function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-[var(--card-bg)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={bannerImages[currentIndex].url}
            alt={bannerImages[currentIndex].alt}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[var(--foreground)] shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[var(--foreground)] shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-gold-600"
                : "w-2 bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-[var(--foreground)] backdrop-blur-sm transition-all hover:bg-white"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </section>
  );
}

