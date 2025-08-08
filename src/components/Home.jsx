import React from "react";
import { Info, Package, Mail } from "lucide-react";
import logo from "../assets/logo.png";

export default function Home() {
  const boxStyles = [
    "bg-purple-300",
    "bg-purple-400",
    "bg-purple-500",
    "bg-purple-600",
    "bg-purple-700",
  ];

  const renderStairSteps = (direction = "top-left", size = 10) => {
    const boxes = [];
    const delayMap = [];
  
    // Calculate delays from farthest tile to nearest
    for (let row = 0; row < size; row++) {
      const cols = size - row;
      for (let col = 0; col < cols; col++) {
        const distance = row + col;
        delayMap.push({ row, col, delay: distance * 0.1 });
      }
    }
  
    delayMap.sort((a, b) => b.delay - a.delay); // farthest tiles first
  
    for (let i = 0; i < delayMap.length; i++) {
      const { row, col, delay } = delayMap[i];
  
      const style = {
        top: direction === "top-left" ? `${row * 4.2}rem` : "auto",
        left: direction === "top-left" ? `${col * 4.2}rem` : "auto",
        bottom: direction === "bottom-right" ? `${row * 4.2}rem` : "auto",
        right: direction === "bottom-right" ? `${col * 4.2}rem` : "auto",
        "--delay": `${delay}s`,
      };
  
      boxes.push(
        <div
          key={`${direction}-${row}-${col}`}
          className={`w-16 h-16 absolute rounded-md shadow-md opacity-70 
            ${boxStyles[(row + col) % boxStyles.length]} 
            animate-unfold-float`}
          style={style}
        ></div>
      );
    }
  
    return boxes;
  };    
  
  return (
    <div className="min-h-screen bg-[#f4f1ee] font-sans relative overflow-hidden">
      {/* Floating animation keyframes */}
      <style>
{`
  @keyframes unfold {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    60% {
      transform: scale(1.1);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes floating {
    0% { transform: translate(0, 0); }
    50% { transform: translate(8px, -8px); }
    100% { transform: translate(0, 0); }
  }

  .animate-unfold-float {
    animation:
      unfold 1.2s ease-out forwards,
      floating 6s ease-in-out infinite;
    animation-delay: var(--delay), calc(var(--delay) + 1.2s);
  }
`}
</style>

      {/* Navbar */}
<nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center z-40 relative">
  {/* Left side: Logo + GlucoTrack branding */}
  <div className="flex items-center gap-3">
    <img src={logo} alt="Logo" className="w-20 h-14 object-contain" />
    <div className="flex flex-col justify-center leading-tight">
      <span className="text-2xl font-bold text-gray-800 leading-snug">GlucoTrack</span>
      <span className="text-sm text-gray-500">Redefining the way you monitor</span>
    </div>
  </div>

  {/* Center nav links */}
  <div className="flex gap-6 items-center text-gray-700">
    <div className="flex items-center gap-1 cursor-pointer hover:text-red-600">
      <Info size={18} />
      <span>About Us</span>
    </div>
    <div className="flex items-center gap-1 cursor-pointer hover:text-red-600">
      <Package size={18} />
      <span>Products</span>
    </div>

    {/* Contact Us button */}
    <div className="flex items-center gap-1 bg-purple-600 text-white px-4 py-1.5 rounded-md shadow-md hover:bg-purple-700 cursor-pointer transition-all">
      <Mail size={16} />
      <span className="text-sm">Contact Us</span>
    </div>
  </div>
</nav>


      {/* Video and overlapping decorative stairs */}
      <div className="relative flex justify-center items-center h-[calc(100vh-80px)] z-10">
        {/* Stairs Overlapping Video */}
        <div className="absolute top-[80px] left-0 w-full h-full z-30 pointer-events-none">
          {/* Top-Left: 7 layers */}
          <div className="absolute -top-24 -left-24">
            {renderStairSteps("top-left", 7)}
          </div>
          {/* Bottom-Right: 12 layers (unchanged) */}
          <div className="absolute -bottom-24 -right-24">
            {renderStairSteps("bottom-right", 12)}
          </div>
        </div>

        {/* Embedded YouTube Video */}
        <div className="w-full h-full max-w-7xl aspect-video relative z-20 px-4">
          <iframe
            className="w-full h-full rounded-lg shadow-xl relative"
            src="https://www.youtube.com/embed/k1zVY9MVJVo?autoplay=1&mute=1&loop=1&playlist=k1zVY9MVJVo&controls=0&modestbranding=1&rel=0"
            title="People Working Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
