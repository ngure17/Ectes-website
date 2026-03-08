"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Carousel({
  slides = [],
  autoPlay = true,
  delay = 4000,
  showThumbnails = false,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: true,
      containScroll: "trimSnaps",
    },
    autoPlay ? [Autoplay({ delay, stopOnInteraction: false })] : [],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  const hasContent = slides.some((slide) => slide.content);

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`relative flex-[0_0_85%] min-w-0 sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_35%] px-3 ${
                hasContent
                  ? "flex-[0_0_100%]! sm:flex-[0_0_100%]! md:flex-[0_0_100%]!"
                  : ""
              }`}
            >
              {slide.content ? (
                <div className="relative w-full">{slide.content}</div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 shadow-lg transition-all duration-500 hover:shadow-2xl"
                >
                  {slide.src && (
                    <img
                      src={slide.src}
                      alt={slide.alt || `Slide ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Title Overlay */}
                  {slide.title && (
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full transform p-4 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-sm font-semibold text-white lg:text-base">
                        {slide.title}
                      </p>
                    </div>
                  )}

                  {/* Border Glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-amber-500/30" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg backdrop-blur-sm transition-all hover:bg-amber-500 hover:text-white hover:shadow-xl disabled:opacity-50 md:left-4 lg:h-14 lg:w-14"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg backdrop-blur-sm transition-all hover:bg-amber-500 hover:text-white hover:shadow-xl disabled:opacity-50 md:right-4 lg:h-14 lg:w-14"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-amber-500"
                : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && (
        <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                index === selectedIndex
                  ? "border-amber-500 opacity-100"
                  : "border-transparent opacity-50 hover:opacity-75"
              }`}
            >
              {slide.src && (
                <img
                  src={slide.src}
                  alt={slide.alt || `Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
