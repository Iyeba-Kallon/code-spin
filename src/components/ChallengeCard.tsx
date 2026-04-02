'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, Clock, Trophy, Target, ShieldAlert } from 'lucide-react';
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
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
                "relative max-w-xl w-full p-8 rounded-[2rem] border transition-all duration-700 overflow-hidden",
                isBossMode
                    ? "glass-boss shadow-[0_0_80px_rgba(239,68,68,0.2)]"
                    : "glass-hacker shadow-[0_0_40px_rgba(16,185,129,0.1)]"
            )}
        >
            {/* Animated Data Flow for Boss Mode */}
            {isBossMode && (
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-data-flow animate-data-flow" 
                         style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, #ef4444 50%, transparent 100%)', backgroundSize: '100% 200px' }} />
                </div>
            )}

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-orbitron font-black tracking-widest uppercase",
                        isBossMode ? "bg-boss-red/20 text-boss-red border border-boss-red/30" : "bg-hacker-green/20 text-hacker-green border border-hacker-green/30"
                    )}>
                        {isBossMode ? <ShieldAlert className="w-3 h-3" /> : <Target className="w-3 h-3" />}
                        {isBossMode ? "PRIORITY_BATTLE" : "MISSION_CORE"}
                    </div>
                    
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-orbitron font-bold text-gray-400">
                        <Trophy className={cn("w-3 h-3", isBossMode ? "text-boss-red" : "text-hacker-green")} />
                        <span>{isBossMode ? challenge.points * 2 : challenge.points}PTS_SYNCED</span>
                    </div>
                </div>

                <h2 className={cn(
                    "text-3xl md:text-4xl font-orbitron font-black tracking-tighter mb-4 italic",
                    isBossMode ? "text-white text-glow-red" : "text-white text-glow-green"
                )}>
                    {challenge.title}
                </h2>

                <div className="flex gap-6 mb-8">
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Complexity</span>
                        <div className="flex items-center gap-2 text-xs font-orbitron font-bold text-white/80">
                            <Zap className="w-3 h-3 text-amber-400" />
                            {challenge.difficulty.toUpperCase()}
                        </div>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10" />
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Est_Sync_Time</span>
                        <div className="flex items-center gap-2 text-xs font-orbitron font-bold text-white/80">
                            <Clock className="w-3 h-3 text-blue-400" />
                            {challenge.timeEstimate.toUpperCase()}
                        </div>
                    </div>
                </div>

                <div className="relative p-6 rounded-2xl bg-black/40 border border-white/5 mb-8">
                    <div className="absolute top-0 left-4 -translate-y-1/2 px-2 bg-black text-[8px] font-mono text-gray-500 tracking-widest uppercase">Overview</div>
                    <p className="text-gray-400 font-inter text-sm leading-relaxed">
                        {challenge.description}
                    </p>
                </div>

                <button
                    onClick={onComplete}
                    className={cn(
                        "group relative w-full py-5 rounded-2xl font-orbitron font-black text-xs tracking-[0.3em] transition-all duration-300 active:scale-[0.98] overflow-hidden",
                        isBossMode
                            ? "bg-boss-red text-white shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)]"
                            : "bg-hacker-green text-black shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]"
                    )}
                >
                    <div className="absolute inset-x-0 inset-y-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative flex items-center justify-center gap-3">
                        {isBossMode ? "INIT_BOSS_ENGAGEMENT" : "START_MISSION.TERMINAL"}
                        <Terminal className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </button>
            </div>
        </motion.div>
    );
};
