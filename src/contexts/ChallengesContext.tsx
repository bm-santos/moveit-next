import { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../../challenges.json'

import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';
import { LanguageModal } from '../components/LanguageModal';

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    descriptionEn: string,
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
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
    setEnLanguage: () => void,
    setPtLanguage: () => void,
    language: string
}
interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    language: string
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
    const [language, setLanguage] = useState('en')

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextlevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
        setIsLanguageModalOpen(true)
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])
    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
    }
    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }
    function startNewChallenge() {
        const randomChallegenIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallegenIndex]
        setActiveChallenge(challenge)

        new Audio('./notification.mp3').play()

        if (Notification.permission === 'granted') {
            if (language === 'en') {

                new Notification('New challenge 🎉', {
                    body: `You'll earn ${challenge.amount} xp!`
                })
            } else {

                new Notification('Novo desafio 🎉', {
                    body: `Valendo ${challenge.amount} xp!`
                })
            }
        }
    }
    function setEnLanguage() {
        setLanguage('en')
        setIsLanguageModalOpen(false)
    }
    function setPtLanguage() {
        setLanguage('pt')
        setIsLanguageModalOpen(false)
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }
        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextlevel) {
            finalExperience = finalExperience - experienceToNextlevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)

    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                experienceToNextlevel,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
                setEnLanguage,
                setPtLanguage,
                language
            }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
            {isLanguageModalOpen && <LanguageModal />}
        </ChallengesContext.Provider>

    )
}