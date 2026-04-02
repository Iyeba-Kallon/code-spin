'use client';

import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Spinner } from '@/components/Spinner';
import { ChallengeCard } from '@/components/ChallengeCard';
import { SolutionModal } from '@/components/SolutionModal';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { Trophy, Zap, ShieldAlert, Cpu, History, Activity } from 'lucide-react';
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
      "min-h-screen relative overflow-hidden transition-colors duration-1000 font-inter",
      isBossMode ? 'bg-[#050000]' : 'bg-[#020403]'
    )}>
      {/* Premium Background System */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated Grid */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isBossMode ? "cyber-grid-boss opacity-20" : "cyber-grid opacity-10"
        )} />
        
        {/* Atmospheric Glows */}
        <div className={cn(
          "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full transition-all duration-1000 opacity-20 animate-float",
          isBossMode ? "bg-boss-red" : "bg-hacker-green"
        )} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full opacity-10 animate-float [animation-delay:2s]" />

        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-scanline opacity-[0.03] animate-scanline pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, black 50%)', backgroundSize: '100% 4px' }} />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center p-4 md:p-8">
        {/* Header / Nav */}
        <div className="w-full max-w-6xl flex justify-between items-center mb-16 mt-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl md:text-6xl font-black font-orbitron tracking-tighter italic flex items-center gap-3">
              <span className={cn(
                "transition-colors duration-500",
                isBossMode ? "text-boss-red text-glow-red" : "text-hacker-green text-glow-green"
              )}>
                CODE
              </span>
              <span className="text-white opacity-90">
                SPIN
              </span>
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full border not-italic tracking-[0.2em] font-mono ml-2 animate-pulse",
                isBossMode ? "text-boss-red border-boss-red/30 bg-boss-red/5" : "text-hacker-green border-hacker-green/30 bg-hacker-green/5"
              )}>
                V2.0_ALPHA
              </span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Activity className={cn("w-3 h-3", isBossMode ? "text-boss-red" : "text-hacker-green")} />
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                Kinetic_Algorithm_Sync_Active
              </p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsHistoryOpen(true)}
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] transition-all active:scale-95 backdrop-blur-md"
          >
            <History className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-orbitron font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors">
              MISSION_LOGS
            </span>
          </motion.button>
        </div>

        {/* Dashboard Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">

          {/* Stats Sidecar */}
          <div className="lg:col-span-3 flex lg:flex-col justify-between lg:justify-start gap-5 order-2 lg:order-1">
            <StatCard
              label="TOTAL SCORE"
              value={score}
              icon={<Trophy className="w-4 h-4" />}
              color={isBossMode ? "text-boss-red" : "text-hacker-green"}
              glow={isBossMode ? "hsla(0, 84%, 60%, 0.5)" : "hsla(160, 84%, 39%, 0.5)"}
              delay={0.1}
            />
            <StatCard
              label="SYSTEM LEVEL"
              value={level}
              icon={<Cpu className="w-4 h-4" />}
              color="text-blue-400"
              glow="rgba(96, 165, 250, 0.5)"
              delay={0.2}
            />
            <StatCard
              label="SYNC STREAK"
              value={streak}
              icon={<Zap className="w-4 h-4" />}
              color="text-amber-400"
              glow="rgba(251, 191, 36, 0.5)"
              delay={0.3}
            />
          </div>

          {/* Core Interaction Engine */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="w-full min-h-[550px] flex flex-col items-center justify-center relative">
              {/* Main Card Frame */}
              <motion.div 
                layout
                className={cn(
                  "absolute inset-0 rounded-[2.5rem] transition-all duration-700 overflow-hidden",
                  isBossMode ? "glass-boss" : "glass-hacker"
                )}
              >
                {/* Decorative Internal Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.div>

              <div className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-12">
                <AnimatePresence mode="wait">
                  {!currentChallenge ? (
                    <motion.div
                      key="spinner"
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Spinner 
                        isSpinning={isSpinning} 
                        onSpin={spin} 
                        isBossMode={isBossMode} 
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="challenge"
                      initial={{ opacity: 0, y: 30, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 1.02 }}
                      transition={{ duration: 0.5, ease: "circOut" }}
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

        {/* Footer Hardware Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-auto flex items-center gap-8 text-[9px] font-mono text-gray-600 uppercase tracking-[0.3em] pt-8 border-t border-white/5 w-full max-w-6xl justify-center"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-hacker-green animate-pulse" />
            <span>Core_Stability: 99.8%</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3" />
            <span>Entropy_Factor: {isBossMode ? 'HIGH' : 'STABLE'}</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <ShieldAlert className="w-3 h-3" />
            <span>Terminal_Authorized</span>
          </div>
        </motion.div>
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

function StatCard({ label, value, icon, color, glow, delay }: { label: string, value: number, icon: React.ReactNode, color: string, glow: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex-1 lg:flex-none relative group"
    >
      <div className="absolute inset-0 bg-white/[0.02] rounded-2xl blur-xl group-hover:bg-white/[0.05] transition-all" />
      <div className="relative bg-black/40 border border-white/5 rounded-2xl p-5 backdrop-blur-xl overflow-hidden hover:border-white/10 transition-colors">
        {/* Glow corner */}
        <div 
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40"
          style={{ backgroundColor: glow }}
        />
        
        <div className="flex items-center gap-2 text-gray-500 text-[9px] font-orbitron font-bold tracking-[0.2em] mb-4">
          <span className={color}>{icon}</span>
          {label}
        </div>
        <div className={cn("text-3xl md:text-4xl font-black font-orbitron tabular-nums tracking-tighter", color)}>
          {value.toString().padStart(2, '0')}
        </div>
        
        {/* Decorative mini bar */}
        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((value / 50) * 100, 100)}%` }}
            className={cn("h-full", color.replace('text-', 'bg-'))}
          />
        </div>
      </div>
    </motion.div>
  );
}
