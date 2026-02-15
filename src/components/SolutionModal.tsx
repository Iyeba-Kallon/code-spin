'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Terminal, FileText } from 'lucide-react';
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
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={cn(
                            "fixed z-50 w-full max-w-2xl bg-hacker-card border-2 rounded-xl shadow-2xl overflow-hidden",
                            isBossMode ? "border-boss-red shadow-boss-red/20" : "border-hacker-green shadow-hacker-green/20"
                        )}
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {/* Header */}
                        <div className={cn(
                            "flex items-center justify-between px-6 py-4 border-b",
                            isBossMode ? "border-boss-red/30 bg-boss-red/10" : "border-hacker-green/30 bg-hacker-green/5"
                        )}>
                            <div className="flex items-center gap-2">
                                <Terminal className={cn("w-5 h-5", isBossMode ? "text-boss-red" : "text-hacker-green")} />
                                <h2 className="text-lg font-bold font-mono tracking-tight text-white">
                                    SUBMIT_SOLUTION.EXE
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Terminal className="w-4 h-4" />
                                    Your Solution
                                </label>
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="// Write your code here..."
                                    className={cn(
                                        "w-full h-64 bg-black/50 border rounded-lg p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 transition-all",
                                        isBossMode
                                            ? "border-boss-red/30 focus:border-boss-red text-red-100 placeholder-red-900/50"
                                            : "border-hacker-green/30 focus:border-hacker-green text-green-100 placeholder-green-900/50"
                                    )}
                                    spellCheck={false}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Notes (Optional)
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Implementation details, complexity analysis..."
                                    className="w-full h-24 bg-black/50 border border-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300 resize-none focus:outline-none focus:border-gray-600 transition-all placeholder-gray-700"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray-800 bg-black/20 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg font-mono text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!code.trim()}
                                className={cn(
                                    "px-6 py-2 rounded-lg font-mono text-sm font-bold text-black transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
                                    isBossMode
                                        ? "bg-boss-red hover:bg-red-500"
                                        : "bg-hacker-green hover:bg-emerald-400"
                                )}
                            >
                                <Save className="w-4 h-4" />
                                Submit Solution
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
