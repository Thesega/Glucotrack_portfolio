import React, { useState } from "react";
import Home from "./components/Home";
import TypingIntro from "./components/TypingIntro";

export default function App() {
  const [fadeInHome, setFadeInHome] = useState(false);

  return (
    <div className="relative">
      {/* Home is always rendered but fades in */}
      <div
        className={`transition-opacity duration-[1500ms] ease-out ${
          fadeInHome ? "opacity-100" : "opacity-0"
        }`}
      >
        <Home />
      </div>

      {/* Typing intro on top */}
      <TypingIntro onStartFade={() => setFadeInHome(true)} />
    </div>
  );
}