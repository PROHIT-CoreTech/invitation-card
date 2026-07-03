"use client";
import React, { useState, useRef, useEffect } from "react";
import CurtainReveal from "../components/CurtainReveal";
import WelcomeSection from "../components/WelcomeSection";
import FamilyGrid from "../components/FamilyGrid";
import EventTimeline from "../components/EventTimeline";
import LocationCard from "../components/LocationCard";
import BackgroundMusic from "../components/BackgroundMusic";
import MarigoldPetals from "../components/MarigoldPetals";
import { invitationData } from "../constants/data";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showCurtains, setShowCurtains] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicActivated, setMusicActivated] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);

  // Autoscroll logic after reveal, stops on user intercept
  useEffect(() => {
    if (!isRevealed || userInteracted) return;

    let scrollInterval;
    const startScroll = () => {
      scrollInterval = setInterval(() => {
        // Slow, smooth scroll crawl (1.2px per frame at ~60fps)
        window.scrollBy(0, 1.2);
      }, 16);
    };

    const stopScroll = () => {
      setUserInteracted(true);
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };

    // Delay start of scroll slightly to let the curtain opening animation play out
    const startTimeout = setTimeout(startScroll, 2000);

    // Intercept events to stop autoscroll on any touch/mouse gesture
    const interactionEvents = ["touchmove", "wheel", "mousedown", "keydown", "pointerdown"];
    interactionEvents.forEach((event) => {
      window.addEventListener(event, stopScroll, { passive: true });
    });

    return () => {
      clearTimeout(startTimeout);
      if (scrollInterval) clearInterval(scrollInterval);
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, stopScroll);
      });
    };
  }, [isRevealed, userInteracted]);

  const handleOpenStart = () => {
    // Reset scroll to top to ensure clean start
    window.scrollTo(0, 0);
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

      {/* Center Mobile Container with Traditional Gold Border */}
      <div className="w-full max-w-md min-h-dvh sm:min-h-[92vh] bg-cream sm:rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.2)] border-0 sm:border-2 sm:border-gold/30 flex flex-col relative overflow-hidden mandala-pattern traditional-border mobile-optimize">
        
        {/* Traditional Hanging Toran (Mango Leaves & Marigold Flowers) */}
        <div className="absolute top-3 left-3 right-3 h-8 flex justify-around pointer-events-none z-20 opacity-90 select-none">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* String line */}
              <div className="w-[1px] h-2 bg-amber-600/30" />
              {i % 2 === 0 ? (
                // Marigold Flower (Layered orange/yellow circle)
                <div className="w-4 h-4 rounded-full bg-gradient-to-b from-orange-500 to-saffron shadow-sm flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                </div>
              ) : (
                // Mango Leaf (Pointed green leaf hanging at angle)
                <div className="w-3 h-5 bg-gradient-to-b from-emerald-600 to-green-700 rounded-b-full rounded-tl-full rotate-45 transform origin-top shadow-sm" />
              )}
            </div>
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
            
            {/* Falling Marigold Petals background effect */}
            <MarigoldPetals />
            
            {/* Subtle background watermark image */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 opacity-[0.02] pointer-events-none z-0 bg-[url('/ganesha-main.png')] bg-contain bg-center bg-no-repeat filter sepia hue-rotate-15 contrast-200" />

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
