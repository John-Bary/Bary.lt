"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => null,
});

export default function Scene3DWrapper() {
  const [opacity, setOpacity] = useState(1);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Fade out as user scrolls
    const newOpacity = Math.max(0.2, 1 - scrollY / (windowHeight * 0.8));

    requestAnimationFrame(() => {
      setOpacity(newOpacity);
    });
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        opacity,
        transition: "opacity 0.15s ease-out",
      }}
    >
      <Scene3D />
    </div>
  );
}