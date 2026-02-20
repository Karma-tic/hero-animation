"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
    const lettersRef = useRef<HTMLSpanElement[]>([]);
    const statsRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
  const tl = gsap.timeline();

  // Headline animation
  tl.from(lettersRef.current, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.05,
    ease: "power3.out"
  });

  // Stats animation
  tl.from(
    statsRef.current?.children || [],
    {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    },
    "-=0.5" // overlap slightly for smooth sequence
  );
}, []);
  return (
    <section className="relative h-screen bg-neutral-100 overflow-hidden flex flex-col justify-center items-center">

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center z-10 flex flex-wrap justify-center gap-4">
  {"WELCOMEITZFIZZ".split("").map((letter, index) => (
  <span
    key={index}
    ref={(el) => {
      if (el) lettersRef.current[index] = el;
    }}
    className="inline-block tracking-[0.4em]"
  >
    {letter}
  </span>
))}
</h1>

      {/* Placeholder for stats */}
      <div
  ref={statsRef}
  className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 z-10"
>
        <div className="bg-lime-400 p-8 rounded-2xl shadow-lg w-72">
          <h2 className="text-4xl font-bold">58%</h2>
          <p className="mt-2 text-sm">Increase in pickup usage</p>
        </div>

        <div className="bg-sky-400 p-8 rounded-2xl shadow-lg w-72">
          <h2 className="text-4xl font-bold">23%</h2>
          <p className="mt-2 text-sm">Decrease in support calls</p>
        </div>
      </div>

      {/* Scroll indicator space */}
      <div className="absolute bottom-10 text-sm text-gray-500">
        Scroll to explore ↓
      </div>

    </section>
  );
}