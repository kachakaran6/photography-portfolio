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

export default ContactSection;
