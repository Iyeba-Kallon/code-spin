'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Award, Terminal } from 'lucide-react';
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
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-hacker-dark border-l border-hacker-green/20 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-hacker-green/10 bg-black/40">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-hacker-green" />
                                <h2 className="text-xl font-bold font-mono tracking-tight text-white">
                                    MISSION_LOGS
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {history.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 font-mono text-sm">
                                    NO_RECORDS_FOUND
                                    <br />
                                    <span className="text-xs opacity-50">Complete challenges to populate logs.</span>
                                </div>
                            ) : (
                                history.map((entry, index) => (
                                    <div
                                        key={`${entry.id}-${index}`}
                                        className="bg-black/40 border border-white/5 rounded-lg p-4 space-y-3 hover:border-hacker-green/30 transition-colors group"
                                    >
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-200">{entry.title}</h3>
                                            <span className="text-xs font-mono text-hacker-green flex items-center gap-1">
                                                <Award className="w-3 h-3" />
                                                +{entry.pointsEarned}XP
                                            </span>
                                        </div>

                                        <div className="flex gap-3 text-xs text-gray-500 font-mono">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded bg-white/5",
                                                entry.difficulty === 'Hard' ? "text-purple-400" :
                                                    entry.difficulty === 'Medium' ? "text-yellow-400" : "text-blue-400"
                                            )}>
                                                {entry.difficulty}
                                            </span>
                                            <span>
                                                {new Date(entry.completedAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        {entry.code && (
                                            <div className="mt-3 bg-black/60 rounded p-3 text-xs font-mono text-gray-400 overflow-x-auto border border-white/5 group-hover:border-hacker-green/10 transition-colors">
                                                <pre>{entry.code}</pre>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
