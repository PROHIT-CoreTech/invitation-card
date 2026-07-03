"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CurtainReveal({ onReveal, onOpenStart }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpenStart) {
      onOpenStart();
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/90">
      {/* Left Door */}
      <motion.div
        initial={{ x: 0 }}
        animate={isOpen ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
        onAnimationComplete={() => {
          if (isOpen && onReveal) {
            onReveal();
          }
        }}
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-maroon-dark border-r-2 border-gold flex items-center justify-end overflow-hidden"
        style={{
          boxShadow: "8px 0 30px rgba(0,0,0,0.6)"
        }}
      >
        {/* Shubh text rotated */}
        <div className="absolute right-4 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 font-heading text-gold-light/10 text-6xl sm:text-8xl md:text-9xl select-none writing-mode-vertical">
          शुभ
        </div>
        {/* Subtle pattern background overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none mandala-pattern" />
      </motion.div>

      {/* Right Door */}
      <motion.div
        initial={{ x: 0 }}
        animate={isOpen ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-maroon-dark border-l-2 border-gold flex items-center justify-start overflow-hidden"
        style={{
          boxShadow: "-8px 0 30px rgba(0,0,0,0.6)"
        }}
      >
        {/* Labh text rotated */}
        <div className="absolute left-4 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 font-heading text-gold-light/10 text-6xl sm:text-8xl md:text-9xl select-none writing-mode-vertical">
          लाभ
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none mandala-pattern" />
      </motion.div>

      {/* Center Opening Button with Pulsing Gold Rings */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={handleOpen}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: 1
            }}
            exit={{ 
              scale: 0.3, 
              opacity: 0,
              transition: { duration: 0.3 }
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut"
              },
              opacity: { duration: 0.4 }
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="absolute z-50 w-28 h-28 rounded-full gold-gradient-bg border-4 border-gold shadow-[0_0_30px_rgba(212,175,55,0.7)] flex flex-col items-center justify-center cursor-pointer transition-all"
          >
            {/* Inner details */}
            <div className="absolute inset-1 rounded-full border border-maroon/20 pointer-events-none" />
            
            {/* Traditional motif/symbol */}
            <div className="text-maroon font-heading text-2xl font-bold tracking-widest mt-1">
              उघडा
            </div>
            
            <div className="text-[10px] text-maroon-dark font-body uppercase font-bold tracking-widest mt-0.5">
              Open
            </div>
            
            {/* Decorative small gold dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-maroon-dark mt-1" />

            {/* Pulsing outer glowing rings */}
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute -inset-4 rounded-full border-2 border-gold/40 pointer-events-none" 
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.4 }}
              className="absolute -inset-8 rounded-full border border-gold/20 pointer-events-none" 
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Traditional top and bottom toran/hangings */}
      {!isOpen && (
        <div className="absolute top-0 left-0 right-0 h-8 flex justify-around pointer-events-none z-40 opacity-80">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-6 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-b-full shadow-md" />
          ))}
        </div>
      )}
    </div>
  );
}
