'use client';

import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Challenge, challenges } from '@/utils/challenges';

export const useGameState = () => {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, setStreak] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
    const [isBossMode, setIsBossMode] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    // Load streak from localStorage
    useEffect(() => {
        const savedStreak = localStorage.getItem('coding-spinner-streak');
        if (savedStreak) {
            setStreak(parseInt(savedStreak, 10));
        }
    }, []);

    // Save streak to localStorage
    useEffect(() => {
        localStorage.setItem('coding-spinner-streak', streak.toString());
    }, [streak]);

    // Handle level ups
    useEffect(() => {
        const newLevel = Math.floor(score / 100) + 1;
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
        }
    }, [score, level]);

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

            // Update streak
            setStreak(s => s + 1);
        }, 2000);
    }, [isSpinning]);

    const completeChallenge = useCallback(() => {
        if (!currentChallenge) return;

        const pointsToAdd = isBossMode ? currentChallenge.points * 2 : currentChallenge.points;
        setScore(s => s + pointsToAdd);
        setCurrentChallenge(null);
        setIsBossMode(false);
    }, [currentChallenge, isBossMode]);

    return {
        score,
        level,
        streak,
        currentChallenge,
        isBossMode,
        isSpinning,
        spin,
        completeChallenge,
    };
};
