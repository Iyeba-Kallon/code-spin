'use client';

import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Challenge, challenges } from '@/utils/challenges';

export interface CompletedChallenge extends Challenge {
    completedAt: string;
    code: string;
    notes: string;
    pointsEarned: number;
}

export const useGameState = () => {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, setStreak] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
    const [history, setHistory] = useState<CompletedChallenge[]>([]);
    const [isBossMode, setIsBossMode] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    // Load state from localStorage
    useEffect(() => {
        const savedStreak = localStorage.getItem('coding-spinner-streak');
        const savedScore = localStorage.getItem('coding-spinner-score');
        const savedLevel = localStorage.getItem('coding-spinner-level');
        const savedHistory = localStorage.getItem('coding-spinner-history');

        if (savedStreak) setStreak(parseInt(savedStreak, 10));
        if (savedScore) setScore(parseInt(savedScore, 10));
        if (savedLevel) setLevel(parseInt(savedLevel, 10));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    // Save state to localStorage
    useEffect(() => {
        localStorage.setItem('coding-spinner-streak', streak.toString());
        localStorage.setItem('coding-spinner-score', score.toString());
        localStorage.setItem('coding-spinner-level', level.toString());
        localStorage.setItem('coding-spinner-history', JSON.stringify(history));
    }, [streak, score, level, history]);

    // Handle level ups
    useEffect(() => {
        // Basic level calculation: every 100 points
        // This effect runs on score change primarily
    }, [score]);

    const spin = useCallback(() => {
        if (isSpinning) return;

        setIsSpinning(true);
        setCurrentChallenge(null);
        setIsBossMode(false);

        // Simulate slot machine delay
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * challenges.length);
            const selected = challenges[randomIndex];
            const bossChance = Math.random() < 0.1; // 10% chance

            setCurrentChallenge(selected);
            setIsBossMode(bossChance);
            setIsSpinning(false);
        }, 2000);
    }, [isSpinning]);

    const completeChallenge = useCallback((code: string, notes: string) => {
        if (!currentChallenge) return;

        const pointsToAdd = isBossMode ? currentChallenge.points * 2 : currentChallenge.points;
        const newScore = score + pointsToAdd;

        setScore(newScore);

        // Check for level up based on new score
        const newLevel = Math.floor(newScore / 100) + 1;
        if (newLevel > level) {
            setLevel(newLevel);
            if (typeof window !== 'undefined') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#10b981', '#3b82f6', '#8b5cf6'],
                });
            }
        } else {
            // Small confetti for regular completion
            if (typeof window !== 'undefined') {
                confetti({
                    particleCount: 50,
                    spread: 50,
                    origin: { y: 0.6 },
                    colors: isBossMode ? ['#ef4444'] : ['#10b981'],
                });
            }
        }

        // Add to history
        const completed: CompletedChallenge = {
            ...currentChallenge,
            completedAt: new Date().toISOString(),
            code,
            notes,
            pointsEarned: pointsToAdd
        };

        setHistory(prev => [completed, ...prev]);
        setStreak(s => s + 1);
        setCurrentChallenge(null);
        setIsBossMode(false);
    }, [currentChallenge, isBossMode, score, level]);

    return {
        score,
        level,
        streak,
        history,
        currentChallenge,
        isBossMode,
        isSpinning,
        spin,
        completeChallenge,
    };
};
