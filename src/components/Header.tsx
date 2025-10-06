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

export default Header;
