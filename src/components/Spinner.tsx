'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { challenges } from '@/utils/challenges';
import { cn } from '@/utils/cn';
import { Terminal, Shield } from 'lucide-react';

interface SpinnerProps {
    isSpinning: boolean;
    onSpin: () => void;
    isBossMode?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ isSpinning, onSpin, isBossMode }) => {
    const [displayIndex, setDisplayIndex] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isSpinning) {
            interval = setInterval(() => {
                setDisplayIndex((prev) => (prev + 1) % challenges.length);
            }, 80);
        }
        return () => clearInterval(interval);
    }, [isSpinning]);

    return (
        <div className="flex flex-col items-center gap-12 py-8">
            <div className={cn(
                "relative w-[360px] h-48 rounded-3xl flex items-center justify-center overflow-hidden transition-all duration-700",
                isBossMode ? "glass-boss" : "glass-hacker shadow-[0_0_50px_rgba(16,185,129,0.1)]"
            )}>
                {/* Slot machine hardware detail */}
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white/5 to-transparent z-20" />
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/40 to-transparent z-20" />

                {/* Decorative Side Lines */}
                <div className="absolute left-4 inset-y-8 w-[1px] bg-white/10 z-20" />
                <div className="absolute right-4 inset-y-8 w-[1px] bg-white/10 z-20" />

                <div className="relative w-full h-24 flex items-center justify-center overflow-hidden">
                    {/* Slot machine mask gradient */}
                    <div className="absolute inset-x-0 inset-y-[-20%] bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none z-10" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={displayIndex}
                            initial={{ y: isSpinning ? 60 : 0, opacity: isSpinning ? 0.3 : 1, filter: isSpinning ? "blur(4px)" : "blur(0px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: isSpinning ? -60 : 0, opacity: isSpinning ? 0.3 : 1, filter: isSpinning ? "blur(4px)" : "blur(0px)" }}
                            transition={{ duration: 0.08, ease: "linear" }}
                            className={cn(
                                "text-2xl font-orbitron font-black text-center uppercase tracking-[0.15em] px-8 transition-colors duration-500",
                                isBossMode ? "text-boss-red text-glow-red" : "text-hacker-green text-glow-green"
                            )}
                        >
                            {challenges[displayIndex].title}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Tracking Text */}
                <div className="absolute bottom-3 inset-x-0 flex justify-center gap-8 z-20">
                    <span className="text-[8px] font-mono text-gray-500 tracking-[0.3em]">SECURE_LINK // ID_{displayIndex.toString().padStart(3, '0')}</span>
                </div>
            </div>

            <button
                onClick={onSpin}
                disabled={isSpinning}
                className={cn(
                    "group relative px-14 py-5 rounded-2xl overflow-hidden transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-wait",
                    isBossMode 
                      ? "bg-boss-red text-white shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)]" 
                      : "bg-hacker-green text-black shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]"
                )}
            >
                {/* Button Glow Particle */}
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                
                <span className="relative flex items-center gap-3 font-orbitron font-black text-xs tracking-[0.2em]">
                    {isSpinning ? (
                        <>
                            CALCULATING...
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                <Shield className="w-4 h-4" />
                            </motion.div>
                        </>
                    ) : (
                        <>
                            INIT_SEQUENCE.EXE
                            <Terminal className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </span>
            </button>
        </div>
    );
};
