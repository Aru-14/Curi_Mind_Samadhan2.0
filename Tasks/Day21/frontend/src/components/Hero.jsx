// components/Hero.jsx
import React, { useState, useEffect } from "react";
import developerPhoto from "../assets/dev.jpeg"; // Replace with your photo

function Hero() {
  const fullName = "Arunima Paunikar";
  const [displayedName, setDisplayedName] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      setDisplayedName(fullName.slice(0, index + 1));
      index++;
      if (index > fullName.length) clearInterval(typeInterval);
    }, 150);

    return () => clearInterval(typeInterval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between py-24 px-6 bg-gray-900 text-white overflow-hidden">
      {/* Left: Text */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start space-y-6 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold relative">
          {displayedName}
          <span
            className={`ml-1 border-r-2 border-white transition-opacity duration-200 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
          ></span>
        </h1>
        <p className="text-lg md:text-xl max-w-lg leading-relaxed text-gray-300">
          Full-Stack Developer & AI Enthusiast. I craft interactive web apps
          and AI solutions that solve real-world problems.
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href="#projects"
            className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border-2 border-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Right: Glowing developer photo */}
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end relative z-10">
        <div className="relative w-72 h-72 md:w-80 md:h-80">
          <img
            src={developerPhoto}
            alt="Arunima Paunikar"
            className="w-full h-full object-cover rounded-full border-4 border-purple-600 shadow-xl relative z-20"
          />
          {/* Neon glow around the photo */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-500 opacity-50 blur-xl animate-pulse z-10"></div>
          {/* Animated tech highlight rings */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-400 opacity-30 animate-spin-slow"></div>
          <div className="absolute -inset-3 rounded-full border-2 border-pink-400 opacity-20 animate-spin-slow-reverse"></div>
        </div>
      </div>

      {/* Background floating neon lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-0.5 h-full bg-purple-500 opacity-20 animate-fade-line left-1/4"></div>
        <div className="absolute w-0.5 h-full bg-pink-500 opacity-20 animate-fade-line left-2/4"></div>
        <div className="absolute w-0.5 h-full bg-blue-400 opacity-20 animate-fade-line left-3/4"></div>
      </div>
    </section>
  );
}

export default Hero;
