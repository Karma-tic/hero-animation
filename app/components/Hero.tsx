"use client";

import Stats from "./Stats";
import ScrollVisual from "./ScrollVisual";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden flex flex-col justify-center items-center">
      
      <h1 className="text-6xl md:text-8xl font-bold tracking-[0.4em] text-center">
        W E L C O M E I T Z F I Z Z
      </h1>

      <Stats />

      <ScrollVisual />
      
    </section>
  );
}