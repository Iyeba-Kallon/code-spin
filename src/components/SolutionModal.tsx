'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Terminal, FileText, Cpu, Braces } from 'lucide-react';
import { Challenge } from '@/utils/challenges';
import { cn } from '@/utils/cn';

interface SolutionModalProps {
    isOpen: boolean;
    onClose: () => void;
    challenge: Challenge | null;
    onSubmit: (code: string, notes: string) => void;
    isBossMode: boolean;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({
    isOpen,
    onClose,
    challenge,
    onSubmit,
    isBossMode,
}) => {
    const [code, setCode] = useState('');
    const [notes, setNotes] = useState('');

    if (!isOpen || !challenge) return null;

    const handleSubmit = () => {
        onSubmit(code, notes);
        setCode('');
        setNotes('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={cn(
                            "relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[2.5rem] border overflow-hidden shadow-2xl",
                            isBossMode ? "glass-boss" : "glass-hacker"
                        )}
                    >
                        {/* Hardware Header */}
                        <div className={cn(
                            "flex items-center justify-between px-8 py-6 border-b shrink-0 bg-black/40",
                            isBossMode ? "border-boss-red/20" : "border-hacker-green/20"
                        )}>
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "p-2 rounded-xl",
                                    isBossMode ? "bg-boss-red/10 text-boss-red" : "bg-hacker-green/10 text-hacker-green"
                                )}>
                                    <Cpu className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-sm font-orbitron font-black tracking-[0.2em] text-white">
                                        SUBMISSION_TERMINAL
                                    </h2>
                                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Target: {challenge.title}</span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrolling Content */}
                        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar bg-black/20">
                            {/* Code Input */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-2">
                                    <label className="text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <Braces className={cn("w-3.5 h-3.5", isBossMode ? "text-boss-red" : "text-hacker-green")} />
                                        Algorithm_Buffer
                                    </label>
                                    <span className="text-[8px] font-mono text-gray-600">INPUT_READY</span>
                                </div>
                                <div className="relative group">
                                    <textarea
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="// Enter your logic here..."
                                        className={cn(
                                            "w-full h-72 bg-black/60 border rounded-2xl p-6 font-mono text-sm resize-none focus:outline-none transition-all duration-300",
                                            isBossMode
                                                ? "border-boss-red/20 focus:border-boss-red/60 text-red-100 placeholder-red-900/30"
                                                : "border-hacker-green/20 focus:border-hacker-green/60 text-green-100 placeholder-green-900/30 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]"
                                        )}
                                        spellCheck={false}
                                    />
                                    {/* Subtle corner detail */}
                                    <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t border-r border-white/5 rounded-tr-2xl" />
                                </div>
                            </div>

                            {/* Notes Input */}
                            <div className="space-y-3">
                                <label className="px-2 text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                                    Implementation_Notes
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Explain your approach..."
                                    className="w-full h-24 bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-sm text-gray-300 resize-none focus:outline-none focus:border-white/20 transition-all placeholder-gray-700"
                                />
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="px-8 py-6 border-t border-white/5 bg-black/40 flex items-center justify-between shrink-0">
                            <div className="hidden md:flex items-center gap-2">
                                <Terminal className="w-3 h-3 text-gray-600" />
                                <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">STATUS: WAITING_FOR_SYNC</span>
                            </div>
                            <div className="flex gap-4 w-full md:w-auto">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 rounded-xl font-orbitron font-bold text-[10px] tracking-widest text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    ABORT
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!code.trim()}
                                    className={cn(
                                        "flex-1 md:flex-none px-8 py-3 rounded-xl font-orbitron font-black text-[10px] tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed",
                                        isBossMode
                                            ? "bg-boss-red text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                                            : "bg-hacker-green text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                                    )}
                                >
                                    <Save className="w-4 h-4" />
                                    SYNC_MISSION
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
