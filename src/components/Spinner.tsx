'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { challenges } from '@/utils/challenges';
import { cn } from '@/utils/cn';
import { Terminal } from 'lucide-react';

interface SpinnerProps {
    isSpinning: boolean;
    onSpin: () => void;
}

export const Spinner: React.FC<SpinnerProps> = ({ isSpinning, onSpin }) => {
    const [displayIndex, setDisplayIndex] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isSpinning) {
            interval = setInterval(() => {
                setDisplayIndex((prev) => (prev + 1) % challenges.length);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isSpinning]);

    return (
        <div className="flex flex-col items-center gap-8 py-12">
            <div className="relative w-80 h-32 bg-hacker-dark border-4 border-hacker-green rounded-lg flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                {/* Slot machine window */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none z-10" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={displayIndex}
                        initial={{ y: isSpinning ? 50 : 0, opacity: isSpinning ? 0 : 1 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: isSpinning ? -50 : 0, opacity: isSpinning ? 0 : 1 }}
                        transition={{ duration: 0.1, ease: "linear" }}
                        className="text-xl font-mono font-bold text-hacker-green text-center uppercase tracking-widest px-4"
                    >
                        {challenges[displayIndex].title}
                    </motion.div>
                </AnimatePresence>

                {/* Decorative scanline */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-hacker-green/20 animate-pulse-glow pointer-events-none" />
            </div>

            <button
                onClick={onSpin}
                disabled={isSpinning}
                className={cn(
                    "group relative px-12 py-4 bg-hacker-green text-black font-bold font-mono rounded-md overflow-hidden transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                    isSpinning && "animate-pulse"
                )}
            >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <span className="relative flex items-center gap-2">
                    {isSpinning ? "CALCULATING..." : "RUN_CHALLENGE.EXE"}
                    <Terminal className="w-5 h-5" />
                </span>
            </button>
        </div>
    );
};
