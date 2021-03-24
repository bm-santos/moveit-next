import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
    const { language, challengesCompleted } = useContext(ChallengesContext)
    return (
        <div className={styles.completedChallengesContainer}>
            <span>
                {language === 'en'
                    ?
                    <>
                        Completed challenges
                    </>
                    :
                    <>
                        Desafios completos
                    </>
                }
            </span>
            <span>{challengesCompleted}</span>            <span></span>
        </div>
    )
}