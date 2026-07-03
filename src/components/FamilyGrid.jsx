"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { invitationData } from "../constants/data";

export default function FamilyGrid() {
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 } 
    }
  };

  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-10 px-6 traditional-border bg-cream-dark/30 my-6 relative overflow-hidden">
      {/* Decorative Gold Frame Corner Accents */}
      <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-gold/60" />
      <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-gold/60" />
      <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-gold/60" />
      <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-gold/60" />

      {/* Subtle Background Mandala Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.03] pointer-events-none z-0">
        <img 
          src="/invitation_bg.png" 
          alt="mandala" 
          className="w-full h-full object-contain filter sepia"
        />
      </div>

      {/* Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headingVariants}
        className="text-center mb-8 flex flex-col items-center"
      >
        <span className="text-gold text-lg">✦</span>
        <h2 className="font-heading text-3xl text-maroon font-bold mt-1">
          {invitationData.hostTitle}
        </h2>
        <div className="w-12 h-[2px] gold-gradient-bg mt-2" />
      </motion.div>

      {/* Family Grid Container with Staggered Viewport Reveal */}
      <motion.div 
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 gap-4"
      >
        {invitationData.hosts.map((host, index) => (
          <motion.div
            key={host.id}
            variants={cardVariants}
            className={`flex flex-col items-center bg-white/70 backdrop-blur-xs border border-gold/30 rounded-xl p-3 shadow-sm relative overflow-hidden group hover:border-gold transition-all duration-300 ${
              invitationData.hosts.length % 2 !== 0 && index === invitationData.hosts.length - 1
                ? "col-span-2 max-w-[170px] w-full mx-auto"
                : ""
            }`}
          >
            {/* Visual corner decoration in each card */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-gold-dark/40" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-gold-dark/40" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-gold-dark/40" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-gold-dark/40" />

            {/* Profile Image Frame */}
            <div className="relative w-24 h-24 rounded-full border-2 border-gold p-1 bg-cream-dark overflow-hidden shadow-md mb-3 transition-transform duration-300 group-hover:scale-105">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={host.image}
                  alt={host.name}
                  fill
                  sizes="(max-w-md) 100px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Host Details */}
            <div className="text-center z-10">
              <h3 className="font-body text-xs font-bold text-maroon-dark line-clamp-1">
                {host.name}
              </h3>
              <p className="font-body text-[10px] text-saffron-dark font-semibold mt-0.5">
                {host.relation}
              </p>
              <span className="inline-block mt-1 text-[9px] bg-maroon text-gold-light px-2.5 py-0.5 rounded-full font-body font-normal shadow-sm">
                {host.role}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
