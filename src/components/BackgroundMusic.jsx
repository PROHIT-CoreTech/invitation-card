"use client";
import React from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic({ isActivated, isPlaying, onToggle }) {
  return (
    <div className="fixed top-6 max-w-md w-full px-6 flex justify-end pointer-events-none z-45">
      {isActivated && (
        <button
          onClick={onToggle}
          className={`pointer-events-auto w-10 h-10 rounded-full gold-gradient-bg border-2 border-gold flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] cursor-pointer transition-all hover:scale-105 active:scale-95 ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
          aria-label={isPlaying ? "Mute music" : "Play music"}
        >
          <div className="absolute inset-0.5 rounded-full border border-maroon/20 pointer-events-none" />
          {isPlaying ? (
            <Volume2 className="w-4.5 h-4.5 text-maroon animate-pulse" />
          ) : (
            <VolumeX className="w-4.5 h-4.5 text-maroon" />
          )}
        </button>
      )}
    </div>
  );
}
