import { useContext } from 'react';
import { updateIntersectionTypeNode } from 'typescript';
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { language, activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();
    }
    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>
                        {language === 'en'
                            ?
                            <>
                                Earn {activeChallenge.amount} xp
                            </>
                            :
                            <>
                                Ganhe {activeChallenge.amount} xp
                            </>
                        }
                    </header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Level Up" />
                        {language === 'en'
                            ?
                            <>

                                <strong>New challenge</strong>
                                <p>{activeChallenge.descriptionEn}</p>
                            </>
                            :
                            <>
                                <strong>Novo desafio</strong>
                                <p>{activeChallenge.description}</p>
                            </>
                        }

                    </main>
                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            {language === 'en'
                                ?
                                <>

                                    I failed
                                </>
                                :
                                <>
                                    Falhei
                                </>
                            }
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            {language === 'en'
                                ?
                                <>

                                    I completed
                                </>
                                :
                                <>
                                    Completei
                                </>
                            }
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>
                        {language === 'en'
                            ?
                            <>
                                Complete a cycle to receive a new challenge
                            </>
                            :
                            <>
                                Finalize um ciclo para receber um desafio
                            </>
                        }
                    </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                        {language === 'en'
                            ?
                            <>
                                Complete challenges to go to the next level.
                            </>
                            :
                            <>
                                Avance de nível completando desafios.
                            </>
                        }
                    </p>
                </div>
            )}
        </div>
    )
}