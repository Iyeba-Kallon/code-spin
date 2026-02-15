'use client';

import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Spinner } from '@/components/Spinner';
import { ChallengeCard } from '@/components/ChallengeCard';
import { SolutionModal } from '@/components/SolutionModal';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { Trophy, Zap, ShieldAlert, Cpu, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function Home() {
  const {
    score,
    level,
    streak,
    history,
    currentChallenge,
    isBossMode,
    isSpinning,
    spin,
    completeChallenge,
  } = useGameState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleOpenSubmission = () => {
    setIsModalOpen(true);
  };

  const handleCloseSubmission = () => {
    setIsModalOpen(false);
  };

  const handleSubmitSolution = (code: string, notes: string) => {
    completeChallenge(code, notes);
  };

  return (
    <main className={cn(
      "min-h-screen relative overflow-hidden transition-colors duration-1000",
      isBossMode ? 'bg-black' : 'bg-hacker-dark'
    )}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={cn(
          "absolute top-1/4 -left-20 w-96 h-96 blur-[150px] rounded-full transition-colors duration-1000 opacity-20",
          isBossMode ? "bg-boss-red" : "bg-hacker-green"
        )} />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full opacity-20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center p-4 md:p-8">
        {/* Header / Nav */}
        <div className="w-full max-w-6xl flex justify-between items-start mb-12">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-black font-mono tracking-tighter italic flex items-center gap-2">
              CODE_SPIN
              <span className={cn(
                "text-sm px-2 py-0.5 rounded border ml-2 not-italic tracking-widest animate-pulse",
                isBossMode ? "text-boss-red border-boss-red" : "text-hacker-green border-hacker-green"
              )}>
                v2.0
              </span>
            </h1>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] mt-2">
              Daily Kinetic Coding Challenges
            </p>
          </div>

          <button
            onClick={() => setIsHistoryOpen(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm"
          >
            <History className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-white transition-colors">
              MISSION_LOGS
            </span>
          </button>
        </div>

        {/* Glass Dashboard */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

          {/* Stats Column */}
          <div className="lg:col-span-3 flex lg:flex-col justify-between lg:justify-start gap-4 order-2 lg:order-1">
            <StatCard
              label="TOTAL SCORE"
              value={score}
              icon={<Trophy className="w-4 h-4" />}
              color="text-hacker-green"
              delay={0.1}
            />
            <StatCard
              label="CURRENT LEVEL"
              value={level}
              icon={<Cpu className="w-4 h-4" />}
              color="text-blue-400"
              delay={0.2}
            />
            <StatCard
              label="ACTIVE STREAK"
              value={streak}
              icon={<Zap className="w-4 h-4" />}
              color="text-yellow-400"
              delay={0.3}
            />
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="w-full min-h-[500px] flex flex-col items-center justify-center relative">
              {/* Glass Container */}
              <div className={cn(
                "absolute inset-0 rounded-3xl border backdrop-blur-xl transition-colors duration-500",
                isBossMode
                  ? "bg-boss-red/5 border-boss-red/20 shadow-[0_0_100px_rgba(239,68,68,0.1)]"
                  : "bg-white/5 border-white/10 shadow-2xl"
              )} />

              <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  {!currentChallenge ? (
                    <motion.div
                      key="spinner"
                      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                      transition={{ duration: 0.5 }}
                    >
                      <Spinner isSpinning={isSpinning} onSpin={spin} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="challenge"
                      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                      className="w-full flex justify-center"
                    >
                      <ChallengeCard
                        challenge={currentChallenge}
                        isBossMode={isBossMode}
                        onComplete={handleOpenSubmission}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center gap-2 text-xs font-mono text-gray-700 uppercase tracking-widest pt-12">
          <ShieldAlert className="w-4 h-4" />
          <span>System Optimized // Session Active // Stay Sharp</span>
        </div>
      </div>

      {/* Overlays */}
      <SolutionModal
        isOpen={isModalOpen}
        onClose={handleCloseSubmission}
        challenge={currentChallenge}
        onSubmit={handleSubmitSolution}
        isBossMode={isBossMode}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
      />
    </main>
  );
}

function StatCard({ label, value, icon, color, delay }: { label: string, value: number, icon: React.ReactNode, color: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex-1 lg:flex-none bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors"
    >
      <div className="flex items-center gap-2 text-gray-400 text-[10px] font-mono font-bold tracking-widest mb-1">
        {icon}
        {label}
      </div>
      <div className={cn("text-2xl md:text-3xl font-black font-mono", color)}>
        {value.toString().padStart(2, '0')}
      </div>
    </motion.div>
  );
}
