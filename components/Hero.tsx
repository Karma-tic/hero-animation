"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const car = carRef.current;
    const trail = trailRef.current;
    const road = car?.parentElement;
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    const boxes = boxRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!car || !trail || !road) return;

    const setupAnimation = () => {
      const roadWidth = road.offsetWidth;
      const carWidth = car.offsetWidth;
      const endX = roadWidth - carWidth;

      const letterOffsets = letters.map((letter) => letter.offsetLeft);

      // 🚗 Car movement + trail + letter reveal
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
            letter.style.opacity =
              carCenter >= letterOffsets[i] ? "1" : "0";
          });

          gsap.set(trail, { width: carCenter });
        },
      });

      // 📊 Floating stat boxes animation
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
    <div ref={sectionRef} className="section">
      <div ref={trackRef} className="track">

        <div className="road">
          <div ref={trailRef} className="trail" />

          <img
            ref={carRef}
            src="/McLaren 720S 2022 top view.png"
            alt="car"
            className="car"
          />

          <div className="letters">
            {"WELCOME ITZFIZZ".split("").map((letter, index) => (
              <span
                key={index}
                ref={(el) => {
  lettersRef.current[index] = el;
}}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Floating Stat Boxes */}
        <div
          ref={(el) => {
  lettersRef.current[0] = el;
}}
          className="stat-box box1"
        >
          <h2>72%</h2>
          <p>Growth in EV adoption</p>
        </div>

        <div
          ref={(el) => {
  lettersRef.current[1] = el;
}}
          className="stat-box box2"
        >
          <h2>31%</h2>
          <p>Reduction in service calls</p>
        </div>

        <div
          ref={(el) => {
  lettersRef.current[2] = el;
}}
          className="stat-box box3"
        >
          <h2>54%</h2>
          <p>Improved charging efficiency</p>
        </div>

        <div
          ref={(el) => {
  lettersRef.current[3] = el;
}}
          className="stat-box box4"
        >
          <h2>89%</h2>
          <p>Customer satisfaction boost</p>
        </div>

      </div>
    </div>
  );
}