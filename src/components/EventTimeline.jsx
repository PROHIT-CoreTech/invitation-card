"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  BellRing, 
  Sparkles, 
  Utensils, 
  Waves,
  Sparkle,
  Calendar
} from "lucide-react";
import { invitationData } from "../constants/data";

const getIcon = (iconName) => {
  switch (iconName) {
    case "Ganpati":
      return <Sparkle className="w-5 h-5 text-maroon" />;
    case "Aarti":
      return <BellRing className="w-5 h-5 text-maroon animate-bounce" style={{ animationDuration: "3s" }} />;
    case "Gauri":
      return <Sparkles className="w-5 h-5 text-maroon" />;
    case "Prasad":
      return <Utensils className="w-5 h-5 text-maroon" />;
    case "Visarjan":
      return <Waves className="w-5 h-5 text-maroon" />;
    default:
      return <Sparkle className="w-5 h-5 text-maroon" />;
  }
};

export default function EventTimeline() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.1 }
    }
  };

  return (
    <section className="py-10 px-6 traditional-border my-6 relative overflow-hidden bg-white/40 backdrop-blur-xs">
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
      <div className="text-center mb-10 flex flex-col items-center">
        <span className="text-gold text-lg">✦</span>
        <h2 className="font-heading text-3xl text-maroon font-bold mt-1">
          {invitationData.eventTitle}
        </h2>
        <div className="w-12 h-[2px] gold-gradient-bg mt-2" />
      </div>

      {/* Vertical Timeline Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative border-l border-gold/40 ml-4 pl-6 space-y-8 pb-4"
      >
        {invitationData.events.map((event) => (
          <motion.div 
            key={event.id} 
            variants={itemVariants}
            className="relative flex flex-col"
          >
            {/* Timeline Node Ring (Animates with spring bounce) */}
            <motion.div 
              variants={nodeVariants}
              className="absolute -left-[37px] top-1 w-6 h-6 rounded-full gold-gradient-bg border border-gold flex items-center justify-center shadow-md z-10"
            >
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                {getIcon(event.icon)}
              </div>
            </motion.div>

            {/* Event Card */}
            <div className="bg-white/70 backdrop-blur-xs border border-gold/20 rounded-xl p-4 shadow-sm relative hover:border-gold/50 transition-all duration-300 group">
              {/* Corner accent for cards */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-saffron group-hover:scale-125 transition-transform" />

              {/* Timing Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] bg-saffron-light/20 text-saffron-dark font-body font-bold px-2 py-0.5 rounded-md">
                  {event.date}
                </span>
                <span className="text-[10px] bg-maroon-light/10 text-maroon-light font-body font-bold px-2 py-0.5 rounded-md">
                  {event.time}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-body text-sm font-bold text-maroon group-hover:text-maroon-light transition-colors">
                {event.title}
              </h3>
              <p className="font-body text-xs text-maroon-dark/85 mt-1 leading-relaxed">
                {event.details}
              </p>
              
              {/* Add to Calendar Button */}
              <div className="mt-3 flex justify-end">
                <a 
                  href={event.calendarUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-body font-bold text-gold-dark hover:text-saffron-dark bg-gold/5 hover:bg-gold/10 border border-gold/20 hover:border-gold/40 px-2.5 py-1 rounded-md transition-all duration-300 active:scale-95 shadow-sm"
                >
                  <Calendar className="w-3 h-3" />
                  कॅलेंडरमध्ये जोडा
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
