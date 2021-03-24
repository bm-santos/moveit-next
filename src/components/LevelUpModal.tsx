import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
    const { level, closeLevelUpModal, language } = useContext(ChallengesContext)
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                {
                    language === 'en'
                        ?
                        <>
                            <strong>Well done!</strong>
                            <p>You have reached a new level.</p>
                        </>
                        :
                        <>
                            <strong>Parabéns</strong>
                            <p>Você alcançou um novo nível.</p>
                        </>
                }

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>
            </div>

        </div>
    )
}