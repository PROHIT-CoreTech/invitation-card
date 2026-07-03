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

      {/* RSVP Section */}
      <div className="mt-6 bg-cream border border-gold/30 rounded-xl p-4 text-center relative overflow-hidden shadow-sm flex flex-col items-center">
        <div className="absolute inset-0 opacity-5 pointer-events-none mandala-pattern" />
        <h4 className="font-heading text-lg text-maroon font-bold flex items-center gap-1.5 mb-1.5">
          आर.एस.व्ही.पी (RSVP)
        </h4>
        <p className="font-body text-[11px] text-maroon-dark/80 max-w-xs mb-3">
          आगमनाच्या सोयीसाठी व नियोजनासाठी आपण येत असल्याची माहिती कृपया खालील बटणावर क्लिक करून कळवावी.
        </p>
        <motion.a
          href={`https://wa.me/${invitationData.rsvpPhoneNumber}?text=${encodeURIComponent("नमस्कार, आम्ही बर्गे कुटुंबाच्या गणेशोत्सवाला सहकुटुंब नक्की येत आहोत. सदस्य संख्या: [२]")}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-body text-xs font-bold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-emerald-500"
        >
          <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          आम्ही नक्की येत आहोत!
        </motion.a>
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
