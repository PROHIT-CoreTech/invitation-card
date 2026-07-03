"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { invitationData } from "../constants/data";

// Sparkle configurations for floating background elements
const sparkles = [
  { id: 1, top: "12%", left: "15%", delay: 0.1, size: 10 },
  { id: 2, top: "20%", left: "82%", delay: 0.5, size: 14 },
  { id: 3, top: "45%", left: "8%", delay: 0.9, size: 8 },
  { id: 4, top: "68%", left: "88%", delay: 0.3, size: 12 },
  { id: 5, top: "82%", left: "18%", delay: 1.2, size: 10 },
  { id: 6, top: "35%", left: "74%", delay: 1.5, size: 9 },
];

export default function WelcomeSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center text-center p-6 min-h-[92vh] justify-center traditional-border overflow-hidden"
    >
      {/* Decorative Gold Frame Corner Accents */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold" />

      {/* Floating Sparkles Background */}
      {sparkles.map((sp) => (
        <motion.div
          key={sp.id}
          className="absolute pointer-events-none text-gold-light/40 select-none z-0"
          style={{ top: sp.top, left: sp.left }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [0.7, 1.2, 0.7],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: sp.delay,
            ease: "easeInOut",
          }}
        >
          <svg width={sp.size} height={sp.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l3.09 9 9 3.09-9 3.09-3.09 9-3.09-9-9-3.09 9-3.09z" />
          </svg>
        </motion.div>
      ))}

      {/* Traditional Marigold Toran / Garland on top of the section */}
      <div className="absolute top-4 left-4 right-4 h-6 flex justify-between px-2 items-center pointer-events-none opacity-90 z-10">
        {[...Array(9)].map((_, i) => (
          <div 
            key={i} 
            className={`w-3.5 h-3.5 rounded-full ${i % 2 === 0 ? 'bg-saffron shadow-[0_2px_4px_rgba(230,126,0,0.3)]' : 'bg-saffron-dark shadow-[0_2px_4px_rgba(128,0,0,0.2)]'} relative`}
          >
            <div className="absolute top-3 left-1 w-1.5 h-2.5 bg-green-700 rounded-b-full opacity-80" />
          </div>
        ))}
      </div>

      {/* Shloka Section */}
      <motion.p 
        variants={itemVariants}
        className="font-body text-xs md:text-sm italic text-maroon-light whitespace-pre-line leading-relaxed mb-6 font-semibold tracking-wide bg-cream-dark/50 p-4 rounded-xl border border-gold/20 shadow-sm z-10 max-w-[90%]"
      >
        {invitationData.shloka}
      </motion.p>

      {/* Lord Ganesha Image inside a traditional golden halo */}
      <motion.div 
        variants={itemVariants}
        className="relative w-56 h-56 md:w-64 md:h-64 my-2 flex items-center justify-center z-10"
      >
        {/* Golden halo rings */}
        <div className="absolute inset-0 rounded-full border border-gold/20 animate-spin-slow pointer-events-none" />
        <div className="absolute inset-2 rounded-full border border-dashed border-gold/30 pointer-events-none animate-pulse" />
        
        <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden">
          <Image
            src="/ganesha.png"
            alt="Lord Ganesha"
            fill
            priority
            sizes="(max-w-md) 100vw, 300px"
            className="object-contain filter drop-shadow-[0_12px_20px_rgba(128,0,0,0.2)]"
          />
        </div>
      </motion.div>

      {/* Welcome Title with Saffron-to-Gold Shimmer Gradient */}
      <motion.div variants={itemVariants} className="mt-4 z-10">
        <span className="text-xs uppercase font-body font-bold tracking-widest text-saffron-dark">
          {invitationData.title}
        </span>
        <h1 className="font-heading text-4xl md:text-5xl mt-1 bg-gradient-to-r from-saffron-dark via-gold-light to-gold-dark bg-clip-text text-transparent drop-shadow-sm font-normal tracking-wide">
          {invitationData.subtitle}
        </h1>
      </motion.div>

      {/* Divider */}
      <motion.div variants={itemVariants} className="flex justify-center items-center gap-1.5 my-4 z-10">
        <div className="w-8 h-[1px] bg-gold/50" />
        <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
        <div className="w-8 h-[1px] bg-gold/50" />
      </motion.div>

      {/* Welcoming Copy */}
      <motion.p 
        variants={itemVariants}
        className="font-body text-sm md:text-base text-maroon-dark leading-relaxed max-w-sm px-4 mt-2 font-medium z-10"
      >
        {invitationData.welcomingNote}
      </motion.p>

      {/* Scroll Down Indicator */}
      <motion.div 
        variants={itemVariants}
        className="mt-10 animate-bounce flex flex-col items-center z-10"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark font-body">खाली स्क्रोल करा</span>
        <span className="text-gold text-sm mt-1">▼</span>
      </motion.div>
    </motion.section>
  );
}
