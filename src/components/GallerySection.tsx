"use client";

import React, { useEffect, useRef, useState } from "react";

import { Sparkles } from "lucide-react";

type ImageType = {
  id: number;
  url: string;
  title: string;
  category: string;
};

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const images: ImageType[] = [
    {
      id: 1,
      url: "/images/in-the-skys.jpg",
      title: "Sky High",
      category: "People",
    },
    {
      id: 2,
      url: "/images/model.jpg",
      title: "Modeling",
      category: "Model",
    },
    {
      id: 3,
      url: "/images/monster.jpg",
      title: "Monster",
      category: "Branding",
    },
    {
      id: 4,
      url: "/images/professional.jpg",
      title: "Professional",
      category: "Studio",
    },
    {
      id: 5,
      url: "/images/sweet-corn.png",
      title: "Foodie",
      category: "Vegetables",
    },
    {
      id: 6,
      url: "/images/traditional.jpg",
      title: "Traditional",
      category: "People",
    },
    {
      id: 7,
      url: "/images/virtual.jpg",
      title: "Tech World",
      category: "AI",
    },
    // {
    //   id: 8,
    //   url: "/images/",
    //   title: "Coastal",
    //   category: "Nature",
    // },
    // {
    //   id: 9,
    //   url: "/images/",
    //   title: "Forest",
    //   category: "Nature",
    // },
    // {
    //   id: 10,
    //   url: "/images/",
    //   title: "Beach",
    //   category: "Nature",
    // },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            setVisibleImages(
              (prev) =>
                new Set([...prev, (target as HTMLElement).dataset.id || ""])
            );
          } else {
            setVisibleImages((prev) => {
              const newSet = new Set(prev);
              newSet.delete((target as HTMLElement).dataset.id || "");
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const imageElements = document.querySelectorAll(".gallery-item");
    imageElements.forEach((el) => observerRef.current?.observe(el));
  }, []);

  return (
    <section
      id="gallery"
      className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black py-24 px-4 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6">
            Our Gallery
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A curated collection of our finest moments captured through the lens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, idx) => (
            <div
              key={image.id}
              data-id={image.id}
              data-delay={idx * 100}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ transitionDelay: `${idx * 100}ms` }}
              className={`gallery-item relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 transform ${
                idx % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
              } ${
                visibleImages.has(String(image.id))
                  ? "opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0"
                  : `opacity-0 ${
                      idx % 2 === 0 ? "-translate-x-32" : "translate-x-32"
                    } translate-y-20 scale-95 rotate-3`
              }`}
              onClick={() => setSelectedImage(image)}
            >
              {/* Glowing border effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
              />

              <div className="relative aspect-square overflow-hidden rounded-2xl border border-purple-500/20 bg-slate-900">
                <img
                  src={image.url}
                  alt={image.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredId === image.id
                      ? "scale-125 rotate-2"
                      : "scale-100 rotate-0"
                  }`}
                />

                {/* Animated overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${
                    hoveredId === image.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Animated lines */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <div
                      className={`transform transition-all duration-500 ${
                        hoveredId === image.id
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }`}
                    >
                      <Sparkles className="mx-auto mb-3 h-8 w-8 text-purple-400 animate-pulse" />
                      <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                      <p className="text-sm text-purple-300 font-semibold tracking-wider">
                        {image.category}
                      </p>
                      <div className="mt-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
                        Click to view
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-8 h-8 border-t-2 border-r-2 border-purple-400 rounded-tr-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-5xl hover:text-purple-400 transition-colors duration-300 hover:rotate-90 transform transition-transform z-50"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <div className="relative max-w-6xl w-full animate-scaleIn">
            <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto object-contain max-h-[80vh]"
              />

              {/* Image info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-purple-300 font-semibold tracking-wider">
                      {selectedImage.category}
                    </p>
                  </div>
                  <Sparkles className="h-10 w-10 text-purple-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
