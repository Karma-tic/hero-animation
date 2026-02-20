"use client";

export default function Hero() {
  return (
    <section className="relative h-screen bg-neutral-100 overflow-hidden flex flex-col justify-center items-center">

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center z-10 flex flex-wrap justify-center gap-4">
  {"WELCOMEITZFIZZ".split("").map((letter, index) => (
    <span
      key={index}
      className="inline-block tracking-[0.4em]"
    >
      {letter}
    </span>
  ))}
</h1>

      {/* Placeholder for stats */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
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