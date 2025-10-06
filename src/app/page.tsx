"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Camera,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  Send,
  Sparkles,
  XIcon,
  MenuIcon,
} from "lucide-react";
import { div } from "framer-motion/client";

// New Header Component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    // The z-20 ensures it sits on top of the canvas (z-index 10 or less)
    // The fixed position keeps it at the top of the viewport
    <header className="fixed top-0 left-0 right-0 z-20 py-4 px-8 backdrop-blur-sm bg-black/30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Placement (Top Left - Standard Practice) */}
        <a href="#hero" className="flex items-center group">
          {/* <img
            src="/logo.png" // 🖼️ Make sure this path is correct for your transparent logo!
            alt="AK Photography Logo"
            className="h-10 md:h-12 transition-transform duration-300 group-hover:scale-105"
          /> */}
          {/* AK */}
          {/* You can optionally add the text here instead of using the image text */}
          <span className="ml-3 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            AK
          </span>
        </a>

        {/* Navigation Links (Add these later if you want them in the header) */}
        <nav className="space-x-8 hidden sm:flex">
          <a
            href="#"
            className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
          >
            Home
          </a>
          <a
            href="#gallery"
            className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
          >
            Contact
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="sm:hidden backdrop-blur-sm bg-black/10 px-4 py-4 flex flex-col space-y-4">
          <a
            href="#"
            onClick={handleLinkClick}
            className="text-gray-300 hover:text-purple-400 font-medium"
          >
            Home
          </a>
          <a
            href="#gallery"
            onClick={handleLinkClick}
            className="text-gray-300 hover:text-purple-400 font-medium"
          >
            Gallery
          </a>
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="text-gray-300 hover:text-purple-400 font-medium"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.opacity = 0;
        this.reset();
      }

      reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (
          !canvas ||
          this.x > canvas.width ||
          this.x < 0 ||
          this.y > canvas.height ||
          this.y < 0
        ) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;
    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            if (!ctx) return;
            ctx.strokeStyle = `rgba(168, 85, 247, ${
              0.15 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-500">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/50" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div
          className={`transition-all duration-[1500ms] ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="relative inline-block mb-8">
            {/* <Camera className="mx-auto h-20 w-20 text-purple-400 animate-pulse" /> */}
          </div>
          <h1 className="mb-6 text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 tracking-tight leading-tight">
            AK
            <br />
            Photography
          </h1>
          <p className="mb-10 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">
            We use advanced AI to craft images that are indistinguishable from
            professional photography, capturing your unique story with striking
            artistry and genuine emotion.
          </p>
          <button
            onClick={scrollToGallery}
            className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Gallery
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Gallery Section Component
const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<{
    id: number;
    url: string;
    title: string;
    category: string;
  } | null>(null);
  const [visibleImages, setVisibleImages] = useState(new Set<string>());
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const images = [
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
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            setVisibleImages(
              (prev) => new Set([...prev, target.dataset.id || ""])
            );
          } else {
            setVisibleImages((prev) => {
              const newSet = new Set(prev);
              newSet.delete(target.dataset.id || "");
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

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black py-24 px-4 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-purple-600/20 rounded-full border border-purple-500/30">
            <span className="text-purple-400 text-sm font-semibold tracking-wider">
              CONTACT
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let&apos;s create something amazing together. Reach out and
            let&apos;s discuss your vision
          </p>
        </div>

        <div className="flex justify-center items-center px-6">
          <div className="grid md:grid-cols-1 gap-16 max-w-3xl w-full">
            {/* Contact Info */}
            <div className="space-y-8">
              {[
                {
                  Icon: Mail,
                  text: "mail to: keyurmaniyar45@gmail.com",
                  label: "Email",
                  href: "mailto:keyurmaniyar45@gmail.com",
                },
                {
                  Icon: Phone,
                  text: "+91 9974730820",
                  label: "Phone",
                  href: "tel:+919974730820",
                },
              ].map(({ Icon, text, label, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="group block p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-500/20 
               hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-600/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{label}</p>
                      <span className="text-lg text-white font-medium">
                        {text}
                      </span>
                    </div>
                  </div>
                </a>
              ))}

              {/* Social Links */}
              <div className="pt-2 text-center md:text-left">
                <h3 className="text-white text-2xl font-bold mb-6 flex items-center justify-center md:justify-start gap-3">
                  Follow Us
                </h3>
                <div className="flex justify-center md:justify-start space-x-4">
                  {[
                    {
                      Icon: Instagram,
                      href: "#",
                      color: "from-purple-600 to-pink-600",
                    },
                    {
                      Icon: Facebook,
                      href: "#",
                      color: "from-blue-600 to-purple-600",
                    },
                    {
                      Icon: Twitter,
                      href: "#",
                      color: "from-blue-400 to-blue-600",
                    },
                  ].map(({ Icon, href, color }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      className={`relative w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white
                         transform hover:scale-110 hover:rotate-6 transition-all duration-300 hover:shadow-2xl group overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      <Icon className="w-6 h-6 relative z-10" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
export default function PhotographyPortfolio() {
  return (
    <div className="font-sans antialiased bg-black">
      <Header />
      <HeroSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}
