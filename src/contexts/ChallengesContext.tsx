import { createContext, ReactNode, useState } from 'react';

import challenges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextlevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge,
    levelUp: () => void;
    startNewChallenge: () => void,
    resetChallenge: () => void
}
interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(17);
    const [challengesCompleted, setChallengesCompleted] = useState(4);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextlevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1)
    }
    function startNewChallenge() {
        const randomChallegenIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallegenIndex]
        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }
    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                experienceToNextlevel,
                challengesCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge
            }}>
            {children}
        </ChallengesContext.Provider>

    )
}