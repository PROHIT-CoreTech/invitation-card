"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Navigation, Share2, Check } from "lucide-react";
import { invitationData } from "../constants/data";

export default function LocationCard() {
  const [copied, setCopied] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "श्री गणेशोत्सव २०२६ निमंत्रण",
      text: "सस्नेह निमंत्रण! आमच्याकडे यावर्षी लाडक्या गणपती बाप्पांचे आगमन होत आहे. सहकुटुंब सहपरिवार दर्शनासाठी नक्की यावे.",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Web Share API failed, using fallback:", err);
      }
    } else {
      // Fallback: Copy URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.log("Clipboard write failed:", err);
      }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-10 px-6 traditional-border my-6 bg-cream relative overflow-hidden"
    >
      {/* Decorative Gold Frame Corner Accents */}
      <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-gold/60" />
      <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-gold/60" />
      <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-gold/60" />
      <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-gold/60" />

      {/* Section Header */}
      <div className="text-center mb-8 flex flex-col items-center">
        <span className="text-gold text-lg">✦</span>
        <h2 className="font-heading text-3xl text-maroon font-bold mt-1">
          {invitationData.venueTitle}
        </h2>
        <div className="w-12 h-[2px] gold-gradient-bg mt-2" />
      </div>

      {/* Stylized Map Card */}
      <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-gold/40 shadow-md group">
        {/* Map Background image */}
        <Image
          src="/map_placeholder.png"
          alt="Traditional Map Card"
          fill
          sizes="(max-w-md) 100vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Soft shadow overlay */}
        <div className="absolute inset-0 bg-maroon-dark/35 backdrop-blur-[1px] transition-all duration-300 group-hover:backdrop-blur-none group-hover:bg-maroon-dark/15" />

        {/* CTA Buttons in centered flex container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 p-4">
          <motion.a
            href={invitationData.venue.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-[85%] flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark hover:from-maroon-dark hover:via-maroon hover:to-maroon-dark text-maroon hover:text-gold-light border-2 border-gold hover:border-gold-light font-body text-[11px] font-bold shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>Google Maps वर मार्ग पहा</span>
            <Navigation className="w-3 h-3 animate-pulse" />
          </motion.a>

          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-[85%] flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-saffron-dark via-saffron-light to-saffron-dark hover:from-maroon-dark hover:via-maroon hover:to-maroon-dark text-cream hover:text-gold-light border-2 border-saffron hover:border-gold-light font-body text-[11px] font-bold shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-gold-light shrink-0" />
                <span>लिंक कॉपी झाली!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 shrink-0" />
                <span>निमंत्रण शेअर करा</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Address Details Container */}
      <div className="mt-6 space-y-3 bg-cream-dark/50 p-4 rounded-xl border border-gold/10 relative overflow-hidden">
        {/* Decorative circle detail */}
        <div className="absolute top-0 right-0 w-8 h-8 opacity-10">
          <svg viewBox="0 0 100 100" className="fill-gold">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center shrink-0 border border-gold/30">
            <MapPin className="w-4 h-4 text-maroon" />
          </div>
          <div>
            <h3 className="font-body text-sm font-bold text-maroon">
              {invitationData.venue.name}
            </h3>
            <p className="font-body text-xs text-maroon-dark/80 mt-1 leading-relaxed">
              {invitationData.venue.address}
            </p>
          </div>
        </div>

        {/* Note */}
        {invitationData.venue.note && (
          <div className="pt-2 border-t border-gold/10 mt-2 text-[11px] text-saffron-dark font-body font-semibold">
            {invitationData.venue.note}
          </div>
        )}
      </div>

      {/* Traditional Sign-off Message */}
      <div className="relative mt-6 flex flex-col items-center">
        <p className="font-body text-xs md:text-sm text-maroon-dark font-bold text-center italic max-w-xs leading-relaxed px-4 border-t border-dashed border-gold/30 pt-4 w-full">
          &ldquo;आपली उपस्थिती चहा-पानासाठी व बाप्पांच्या दर्शनासाठी हवी आहे.&rdquo;
        </p>
      </div>
    </motion.section>
  );
}
