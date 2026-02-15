'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, Clock, Trophy } from 'lucide-react';
import { Challenge } from '@/utils/challenges';
import { cn } from '@/utils/cn';

interface ChallengeCardProps {
    challenge: Challenge;
    isBossMode?: boolean;
    onComplete: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, isBossMode, onComplete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
                "relative max-w-lg w-full p-6 rounded-xl border-2 transition-all duration-500",
                isBossMode
                    ? "bg-hacker-dark border-boss-red shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-glitch"
                    : "bg-hacker-card border-hacker-green shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            )}
        >
            {isBossMode && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-boss-red text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
                    Boss Challenge
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <h2 className={cn(
                    "text-2xl font-bold font-mono tracking-tight",
                    isBossMode ? "text-boss-red" : "text-hacker-green"
                )}>
                    {challenge.title}
                </h2>
                <div className="flex items-center gap-1 text-sm opacity-80">
                    <Trophy className="w-4 h-4" />
                    <span>{isBossMode ? challenge.points * 2 : challenge.points}pts</span>
                </div>
            </div>

            <div className="flex gap-4 mb-4 text-xs font-mono opacity-70">
                <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>{challenge.difficulty}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{challenge.timeEstimate}</span>
                </div>
            </div>

            <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
                {challenge.description}
            </p>

            <button
                onClick={onComplete}
                className={cn(
                    "w-full py-3 rounded-lg font-bold font-mono transition-all active:scale-95",
                    isBossMode
                        ? "bg-boss-red text-white hover:bg-red-600"
                        : "bg-hacker-green text-black hover:brightness-110"
                )}
            >
                Complete Mission
            </button>
        </motion.div>
    );
};
