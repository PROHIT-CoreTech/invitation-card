"use client";
import React, { useState, useEffect } from "react";
import { invitationData } from "../constants/data";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });

  useEffect(() => {
    const targetDate = new Date(invitationData.countdownTarget).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isCompleted) {
    return (
      <div className="w-full text-center py-3 px-4 bg-gradient-to-r from-saffron/20 to-gold/20 border border-gold/40 rounded-xl mt-6 animate-pulse shadow-sm">
        <p className="font-heading text-lg text-maroon font-bold">
          ॐ मंगलमूर्ती मोरया! बाप्पांचे आगमन झाले आहे! 🌸
        </p>
      </div>
    );
  }

  const timerItems = [
    { label: "दिवस", value: timeLeft.days },
    { label: "तास", value: timeLeft.hours },
    { label: "मिनिटे", value: timeLeft.minutes },
    { label: "सेकंद", value: timeLeft.seconds }
  ];

  return (
    <div className="w-full bg-cream-dark/40 border border-gold/30 rounded-2xl p-4 mt-6 relative overflow-hidden shadow-inner text-center">
      {/* Soft background mandala ornament */}
      <div className="absolute inset-0 opacity-5 pointer-events-none mandala-pattern scale-150" />
      
      <p className="font-body text-[11px] text-saffron-dark tracking-widest uppercase font-bold mb-3 flex items-center justify-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
        प्राणप्रतिष्ठापना सोहळा वेळ
      </p>

      <div className="grid grid-cols-4 gap-2.5 relative z-10">
        {timerItems.map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center bg-gradient-to-b from-cream to-cream-dark/50 border border-gold/20 rounded-xl py-2 px-1 shadow-sm transition-all duration-300 hover:border-gold/50"
          >
            <span className="font-heading text-2xl md:text-3xl text-gradient bg-gradient-to-r from-maroon to-saffron font-bold tracking-tight">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="font-body text-[9px] text-maroon-dark/70 font-semibold mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
