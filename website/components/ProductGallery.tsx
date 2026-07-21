"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { withBasePath } from "../lib/site";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const previousImage = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const nextImage = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div>
      <div className="group relative aspect-square overflow-hidden rounded-[2.5rem] bg-[#eee8dc]">
        <Image
          src={withBasePath(images[activeIndex])}
          alt={`${name} — image ${activeIndex + 1}`}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-contain p-6 transition duration-700 group-hover:scale-105 sm:p-10"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Image précédente"
              className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#103943] shadow-lg transition hover:scale-110"
            >
              <ChevronLeft size={21} />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Image suivante"
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#103943] shadow-lg transition hover:scale-110"
            >
              <ChevronRight size={21} />
            </button>
          </>
        )}

        <span className="absolute bottom-5 right-5 rounded-full bg-[#071d22]/80 px-4 py-2 text-xs text-white backdrop-blur">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-2xl border-2 bg-[#eee8dc] transition ${
                activeIndex === index
                  ? "border-[#103943]"
                  : "border-transparent hover:border-[#d6bd82]"
              }`}
            >
              <Image
                src={withBasePath(image)}
                alt={`${name} miniature ${index + 1}`}
                fill
                sizes="150px"
                className="object-contain p-3"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
