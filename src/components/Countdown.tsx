import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {

    const {
        hasFinished,
        isActive,
        minutes,
        resetCountdown,
        seconds,
        startCountdown
    } = useContext(CountdownContext)
    const { language, startNewChallenge, resetChallenge } = useContext(ChallengesContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {hasFinished ? (
                <button disabled
                    className={styles.countdownButton}>
                    {language === 'en'
                        ?
                        <>
                            Cycle has finished
                        </>
                        :
                        <>
                            Ciclo encerrado
                        </>
                    }
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            {language === 'en'
                                ?
                                <>
                                    Cancel cycle
                                </>
                                :
                                <>
                                    Abandonar ciclo
                                </>
                            }
                        </button>
                    ) : (
                        <button type="button"
                            className={styles.countdownButton}
                            onClick={startCountdown}>
                            {language === 'en'
                                ?
                                <>
                                    Start cycle
                                </>
                                :
                                <>
                                    Iniciar um ciclo
                                </>
                            }
                        </button>
                    )}
                </>
            )}

        </div>
    )
}