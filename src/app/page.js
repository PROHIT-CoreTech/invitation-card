"use client";
import React, { useState, useRef } from "react";
import CurtainReveal from "../components/CurtainReveal";
import WelcomeSection from "../components/WelcomeSection";
import FamilyGrid from "../components/FamilyGrid";
import EventTimeline from "../components/EventTimeline";
import LocationCard from "../components/LocationCard";
import BackgroundMusic from "../components/BackgroundMusic";
import { invitationData } from "../constants/data";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showCurtains, setShowCurtains] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicActivated, setMusicActivated] = useState(false);
  const audioRef = useRef(null);

  // Set low background volume (25%) on mount
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
    }
  }, []);

  const handleOpenStart = () => {
    setMusicActivated(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((error) => {
          console.log("Audio play failed on gesture:", error);
        });
    }
  };

  const handleReveal = () => {
    setIsRevealed(true);
    setShowCurtains(false);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((error) => {
          console.log("Toggle play failed:", error);
        });
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 flex justify-center items-center sm:py-6 relative overflow-hidden">
      {/* Visual background decoration for desktop views */}
      <div className="absolute inset-0 bg-radial-gradient from-maroon-dark/20 to-black pointer-events-none hidden sm:block" />

      {/* Audio element managed synchronously at page root */}
      <audio 
        ref={audioRef} 
        src={invitationData.musicUrl} 
        loop 
        preload="auto"
      />

      {/* Center Mobile Container */}
      <div className="w-full max-w-md min-h-dvh sm:min-h-[92vh] bg-cream sm:rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.2)] border-0 sm:border-2 sm:border-gold/30 flex flex-col relative overflow-hidden mandala-pattern mobile-optimize">
        
        {/* Decorative Top Toran inside container */}
        <div className="absolute top-0 left-0 right-0 h-4 flex justify-around pointer-events-none z-20 opacity-70">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-3 h-4 bg-gradient-to-b from-saffron to-saffron-dark rounded-b-full shadow-sm" />
          ))}
        </div>

        {/* Curtain Reveal Overlay */}
        {showCurtains && (
          <CurtainReveal 
            onReveal={handleReveal} 
            onOpenStart={handleOpenStart} 
          />
        )}

        {/* Invitation Content Pages (Visible once curtains open) */}
        {isRevealed && (
          <div className="flex-1 flex flex-col relative z-10 w-full animate-fade-in-up">
            
            {/* Hero Section */}
            <WelcomeSection />

            {/* Family Grid */}
            <FamilyGrid />

            {/* Event Timeline */}
            <EventTimeline />

            {/* Location Card */}
            <LocationCard />

            {/* Footer */}
            <footer className="py-8 text-center bg-maroon text-gold-light border-t-2 border-gold-dark mt-auto relative overflow-hidden flex flex-col items-center">
              <div className="absolute inset-0 opacity-5 pointer-events-none mandala-pattern" />
              <p className="font-heading text-lg tracking-wider animate-pulse">
                {invitationData.greetingText}
              </p>
              <div className="w-24 h-[1px] bg-gold/50 my-2" />
              <p className="font-body text-[10px] text-gold-light/60 uppercase tracking-widest mt-1">
                Barge Family Invitation • 2026
              </p>
            </footer>
            
          </div>
        )}

        {/* Floating background music component */}
        <BackgroundMusic 
          isActivated={musicActivated} 
          isPlaying={isMusicPlaying} 
          onToggle={toggleMusic} 
        />
      </div>
    </main>
  );
}
