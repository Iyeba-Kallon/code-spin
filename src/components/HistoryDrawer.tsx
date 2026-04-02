'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Award, Terminal, Activity, FileCode } from 'lucide-react';
import { CompletedChallenge } from '@/hooks/useGameState';
import { cn } from '@/utils/cn';

interface HistoryDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    history: CompletedChallenge[];
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
    isOpen,
    onClose,
    history,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%', filter: 'blur(20px)' }}
                        animate={{ x: 0, filter: 'blur(0px)' }}
                        exit={{ x: '100%', filter: 'blur(20px)' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative h-full w-full max-w-lg bg-[#050505]/95 border-l border-white/5 shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Hardware Header */}
                        <div className="flex items-center justify-between p-8 border-b border-white/5 bg-black/60 shrink-0">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-hacker-green animate-pulse" />
                                    <h2 className="text-xl font-orbitron font-black tracking-[0.2em] text-white">
                                        MISSION_LOGS
                                    </h2>
                                </div>
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-8">Accessing_Encrypted_Archives...</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 hover:bg-white/5 rounded-full transition-all group"
                            >
                                <X className="w-6 h-6 text-gray-500 group-hover:text-white" />
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-black/20">
                            {history.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                    <Activity className="w-10 h-10 text-gray-800 animate-pulse" />
                                    <div className="text-gray-600 font-orbitron font-bold text-xs tracking-widest">
                                        NO_ACTIVE_RECORDS_FOUND
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">Awaiting_Initial_Sync...</span>
                                </div>
                            ) : (
                                history.map((entry, index) => (
                                    <motion.div
                                        key={`${entry.id}-${index}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative group bg-white/[0.02] border border-white/5 rounded-[1.5rem] p-6 space-y-5 hover:border-hacker-green/20 transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="font-orbitron font-black text-sm text-gray-200 tracking-wide group-hover:text-white transition-colors uppercase italic">{entry.title}</h3>
                                                <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">TS_{new Date(entry.completedAt).getTime()}</span>
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-hacker-green/10 border border-hacker-green/20 text-[10px] font-orbitron font-black text-hacker-green tracking-widest">
                                                +{entry.pointsEarned}XP
                                            </div>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <span className={cn(
                                                "text-[9px] font-orbitron font-bold px-3 py-1 rounded-md tracking-widest uppercase",
                                                entry.difficulty === 'Hard' ? "bg-boss-red/10 text-boss-red border border-boss-red/20" :
                                                    entry.difficulty === 'Medium' ? "bg-amber-400/10 text-amber-400 border border-amber-400/20" : "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                                            )}>
                                                {entry.difficulty}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                                                <Clock className="w-3 h-3" />
                                                {new Date(entry.completedAt).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {entry.code && (
                                            <div className="relative mt-4 bg-black/60 rounded-xl p-5 text-[11px] font-mono text-gray-400 overflow-x-auto border border-white/5 group-hover:border-hacker-green/10 transition-all max-h-32 custom-scrollbar">
                                                <div className="absolute top-2 right-2 flex gap-1 opacity-30">
                                                    <FileCode className="w-3 h-3" />
                                                </div>
                                                <pre className="text-green-500/80 leading-relaxed">{entry.code}</pre>
                                            </div>
                                        )}
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer Hardware Detail */}
                        <div className="p-6 bg-black/60 border-t border-white/5 text-[8px] font-mono text-gray-700 flex justify-between uppercase tracking-[0.3em] shrink-0">
                            <span>Archives_Encrypted</span>
                            <span>Secure_Link: ONLINE</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
