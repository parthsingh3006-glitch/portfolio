"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

const FRAME_COUNT = 63; // frames from 00 to 62

export default function ScrollyCanvas({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(2, '0');
        img.src = `/sequence/frame_${paddedIndex}_delay-0.071s.png`;
        img.onload = () => {
             loadedCount++;
             if (loadedCount === FRAME_COUNT) {
                 setImages(loadedImages);
             }
        };
        // also handle errors just in case
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === FRAME_COUNT) {
                setImages(loadedImages);
            }
        };
        loadedImages.push(img);
    }
  }, []);

  const renderFrame = React.useCallback((index: number) => {
    if (images.length < FRAME_COUNT || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    
    // Object-fit: cover logic
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  useEffect(() => {
    if (images.length < FRAME_COUNT) return;

    // Initial render
    renderFrame(0);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(latest * FRAME_COUNT)
      );
      currentFrameRef.current = frameIndex;
      renderFrame(frameIndex);
    });

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, scrollYProgress, renderFrame]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>
      {/* Parallax Overlay */}
      {children}
    </div>
  );
}
