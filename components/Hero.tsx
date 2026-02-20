"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  const boxRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const car = carRef.current!;
    const trail = trailRef.current!;
    const road = car.parentElement!;
    const letters = lettersRef.current;
    const boxes = boxRefs.current;

    const setupAnimation = () => {
      const roadWidth = road.offsetWidth;
      const carWidth = car.offsetWidth;
      const endX = roadWidth - carWidth;

      const letterOffsets = letters.map((letter) => letter.offsetLeft);

      gsap.to(car, {
  x: endX,
  scale: 1.05,
  ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom top",
    scrub: 1.2,
    pin: trackRef.current,
  },
        onUpdate: () => {
          const carX = gsap.getProperty(car, "x") as number;
          const carCenter = carX + carWidth / 2;

          letters.forEach((letter, i) => {
            if (carCenter >= letterOffsets[i]) {
              letter.style.opacity = "1";
            } else {
              letter.style.opacity = "0";
            }
          });

          gsap.set(trail, { width: carCenter });
        },
      });

      // Animate boxes
      boxes.forEach((box, index) => {
  gsap.fromTo(
    box,
    { opacity: 0, y: 40, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: `top+=${300 + index * 250} top`,
        end: `top+=${450 + index * 250} top`,
        scrub: 1,
      },
    }
  );
});
    };

    if (car.complete) {
      setupAnimation();
    } else {
      car.onload = setupAnimation;
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="h-[220vh] bg-black">
      <div
        ref={trackRef}
        className="sticky top-0 h-screen flex items-center justify-center bg-gray-200 relative"
      >
        {/* ROAD */}
        <div className="relative w-screen h-[220px] bg-neutral-900 overflow-hidden">

          {/* Trail */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500 w-0 blur-[1px]"
          />

          {/* Car */}
          <img
            ref={carRef}
            src="/McLaren 720S 2022 top view.png"
            alt="car"
            className="absolute top-0 left-0 h-full z-30"
          />

          {/* Letters */}
          <div className="absolute top-1/2 left-[5%] -translate-y-1/2 flex gap-3 text-7xl font-bold text-white z-20">
            {"WELCOME ITZFIZZ".split("").map((letter, index) => (
              <span
                key={index}
                ref={(el) => {
                  if (el) lettersRef.current[index] = el;
                }}
                className="opacity-0"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* FLOATING STAT BOXES */}
        {[
          { value: "72%", text: "Growth in EV adoption", color: "bg-lime-400 text-black", pos: "top-[8%] left-[10%]" },
          { value: "31%", text: "Reduction in service calls", color: "bg-sky-400 text-black", pos: "bottom-[10%] left-[20%]" },
          { value: "54%", text: "Improved charging efficiency", color: "bg-neutral-800 text-white", pos: "top-[15%] right-[15%]" },
          { value: "89%", text: "Customer satisfaction boost", color: "bg-orange-500 text-black", pos: "bottom-[12%] right-[12%]" }
        ].map((box, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) boxRefs.current[index] = el;
            }}
            className={`absolute ${box.pos} ${box.color} p-6 rounded-xl opacity-0`}
          >
            <div className="text-4xl font-bold">{box.value}</div>
            <div>{box.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}