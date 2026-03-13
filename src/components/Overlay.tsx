"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full pointer-events-none">
      
      {/* Section 1: 0% scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        <Section1 scrollYProgress={scrollYProgress} />
      </div>

      {/* Section 2: ~30% scroll */}
      <div className="absolute top-[150vh] left-0 w-full h-screen flex items-center px-8 md:px-24">
        <Section2 />
      </div>

      {/* Section 3: ~60% scroll */}
      <div className="absolute top-[300vh] right-0 w-full h-screen flex items-center justify-end px-8 md:px-24">
        <Section3 />
      </div>
    </div>
  );
}

function Section1({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Move up faster than scroll (parallax)
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <motion.div style={{ y, opacity }} className="text-center drop-shadow-2xl px-4">
      <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white uppercase">
        KUMAR PARTH
      </h1>
      <p className="text-xl md:text-3xl text-white/80 mt-4 tracking-wide font-medium">
        Infrastructure & Problem Management
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm md:text-base text-white/60">
        <span>krparth08@gmail.com</span>
        <span>•</span>
        <span>9354747977</span>
      </div>
    </motion.div>
  );
}

function Section2() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, margin: "-20%" }}
      className="max-w-3xl"
    >
      <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl leading-tight">
        Driving operational<br />stability.
      </h2>
      <div className="w-20 h-1 bg-white mt-8 opacity-50 rounded-full" />
    </motion.div>
  );
}

function Section3() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, margin: "-20%" }}
      className="max-w-3xl text-right flex flex-col items-end"
    >
      <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl leading-tight">
        3+ Years of<br />Experience.
      </h2>
      <div className="w-20 h-1 bg-white mt-8 opacity-50 rounded-full" />
    </motion.div>
  );
}
