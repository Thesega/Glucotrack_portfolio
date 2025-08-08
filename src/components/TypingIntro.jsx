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
      if (onStartFade) onStartFade(); // start fading Home in now
      const timer = setTimeout(() => {
        // Remove intro after fade
        setAnimationStage("done");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [animationStage]);

  if (animationStage === "done") return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[9999] transition-colors duration-[1500ms] ease-out
        ${animationStage === "moving" ? "bg-purple-700/0" : "bg-purple-700"}
      `}
    >
      <span
        className={`text-6xl md:text-8xl font-extrabold text-white transition-all duration-[1500ms] ease-out
          ${animationStage === "moving" ? "translate-x-[-400px] translate-y-[-200px] scale-50 opacity-0" : ""}
        `}
      >
        {displayedText}
      </span>
    </div>
  );
}
