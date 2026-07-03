"use client";
import React, { useState, useEffect } from "react";

export default function MarigoldPetals() {
  const [isMounted, setIsMounted] = useState(false);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Generate petals configuration on mount to avoid SSR hydration mismatch
    const generatedPetals = [...Array(15)].map((_, i) => {
      const sizeClass = i % 3 === 0 
        ? "w-2.5 h-4" 
        : i % 3 === 1 
          ? "w-3.5 h-5" 
          : "w-3 h-4.5";
      
      const colorClass = i % 4 === 0 
        ? "bg-gradient-to-b from-saffron to-saffron-dark" 
        : i % 4 === 1 
          ? "bg-gradient-to-b from-gold via-gold-light to-gold-dark" 
          : i % 4 === 2 
            ? "bg-gradient-to-b from-orange-500 to-saffron"
            : "bg-gradient-to-b from-amber-500 to-amber-600";
            
      const shapeClass = i % 2 === 0 
        ? "rounded-full rounded-tl-none rounded-br-none" 
        : "rounded-full rounded-tr-none rounded-bl-none";

      return {
        id: i,
        sizeClass,
        colorClass,
        shapeClass,
        style: {
          left: `${(i * 7) + 5}%`, // Even distribution across screen width with offset
          animationDelay: `${(i * 0.9).toFixed(1)}s`,
          animationDuration: `${(8 + (i % 5) * 2.2).toFixed(1)}s`,
          opacity: 0.8
        }
      };
    });

    setPetals(generatedPetals);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 max-w-md w-full pointer-events-none overflow-hidden z-25">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`animate-petal shadow-[0_1px_4px_rgba(128,0,0,0.15)] ${petal.sizeClass} ${petal.colorClass} ${petal.shapeClass}`}
          style={petal.style}
        />
      ))}
    </div>
  );
}
