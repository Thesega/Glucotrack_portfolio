import React, { useState, useEffect } from "react";

export default function TypingIntro({ onStartFade }) {
  const fullText = "GlucoTrack";
  const [displayedText, setDisplayedText] = useState("");
  const [animationStage, setAnimationStage] = useState("typing");

  useEffect(() => {
    if (animationStage === "typing") {
      let index = 0;
      const typingInterval = setInterval(() => {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) {
          clearInterval(typingInterval);
          setTimeout(() => setAnimationStage("moving"), 800);
        }
      }, 120);
      return () => clearInterval(typingInterval);
    } else if (animationStage === "moving") {
      if (onStartFade) onStartFade();
      const timer = setTimeout(() => {
        setAnimationStage("done");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [animationStage]);

  if (animationStage === "done") return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[9999] overflow-hidden transition-colors duration-[1500ms] ease-out
        ${animationStage === "moving" ? "bg-purple-700/0" : "bg-purple-700"}
      `}
    >
      {/* Fewer smooth floating solid elements */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-lg bg-white/70 animate-float"
          style={{
            width: `${Math.random() * 50 + 30}px`,
            height: `${Math.random() * 50 + 30}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 8 + 6}s`, // slower
            animationDelay: `${Math.random() * 3}s`,
          }}
        ></div>
      ))}

      {/* Typing text */}
      <span
        className={`text-6xl md:text-8xl font-extrabold text-white transition-all duration-[1500ms] ease-out
          ${animationStage === "moving" ? "translate-x-[-400px] translate-y-[-200px] scale-50 opacity-0" : ""}
        `}
        style={{ fontFamily: "'Times New Roman', serif" }}
      >
        {displayedText}
      </span>

      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) translateX(0) scale(1); }
            50% { transform: translateY(-20px) translateX(15px) scale(1.05); }
            100% { transform: translateY(0) translateX(0) scale(1); }
          }

          .animate-float {
            animation-name: float;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </div>
  );
}
