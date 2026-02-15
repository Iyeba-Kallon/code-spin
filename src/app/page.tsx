'use client';

import { useGameState } from '@/hooks/useGameState';
import { Spinner } from '@/components/Spinner';
import { ChallengeCard } from '@/components/ChallengeCard';
import { Trophy, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const {
    score,
    level,
    streak,
    currentChallenge,
    isBossMode,
    isSpinning,
    spin,
    completeChallenge,
  } = useGameState();

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-1000 ${isBossMode ? 'boss-gradient' : 'hacker-gradient'}`}>
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden h-screen">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-hacker-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-12">
        {/* Header / Stats */}
        <div className="w-full flex flex-wrap justify-center gap-8 md:gap-16">
          <StatBox icon={<Trophy className="w-5 h-5" />} label="SCORE" value={score} color="text-hacker-green" />
          <StatBox icon={<Cpu className="w-5 h-5" />} label="LEVEL" value={level} color="text-blue-400" />
          <StatBox icon={<Zap className="w-5 h-5" />} label="STREAK" value={streak} color="text-yellow-400" />
        </div>

        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black font-mono tracking-tighter mb-2 italic">
            CODE_SPIN<span className="text-hacker-green animate-pulse">.EXE</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-[0.3em]">
            Daily Coding Challenges for Elite Devs
          </p>
        </div>

        {/* Action Area */}
        <div className="w-full flex flex-col items-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {!currentChallenge ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Spinner isSpinning={isSpinning} onSpin={spin} />
              </motion.div>
            ) : (
              <motion.div
                key="challenge"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="w-full flex justify-center"
              >
                <ChallengeCard
                  challenge={currentChallenge}
                  isBossMode={isBossMode}
                  onComplete={completeChallenge}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer/Motivation */}
        <div className="mt-8 flex items-center gap-2 text-xs font-mono text-gray-600 uppercase tracking-widest">
          <ShieldAlert className="w-4 h-4" />
          <span>System Optimized // Session Active // Stay Sharp</span>
        </div>
      </div>
    </main>
  );
}

function StatBox({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2 text-gray-500 text-xs font-mono font-bold tracking-widest">
        {icon}
        {label}
      </div>
      <div className={`text-3xl font-black font-mono ${color}`}>
        {value.toString().padStart(2, '0')}
      </div>
    </div>
  );
}
