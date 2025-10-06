"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Camera,
  Mail,
  Phone,
  Send,
  Sparkles,
  XIcon,
  MenuIcon,
} from "lucide-react";
import { div } from "framer-motion/client";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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

    let animationId: number | undefined;
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
      if (animationId !== undefined) {
        cancelAnimationFrame(animationId);
      }
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

export default HeroSection;
