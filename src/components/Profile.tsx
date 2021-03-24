import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';
import { ChallengeBox } from './ChallengeBox';

export function Profile() {
    const { language, level } = useContext(ChallengesContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/bm-santos.png" alt="Bruno Santos" />
            <div>
                <strong>Bruno Santos</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    {language === 'en' ? <>Level</> : <>Nível</>} {level}
                </p>
            </div>
        </div>
    )
}