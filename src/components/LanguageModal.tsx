import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LanguageModal.module.css'

export function LanguageModal() {
    const { setEnLanguage, setPtLanguage } = useContext(ChallengesContext)

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <strong className={styles.title}>Select a language</strong>
                <button type="button" onClick={setPtLanguage} className={styles.pt}>
                    <span><img src="./icons/flag-round-br.png" alt="Português" /></span>
                    <p>Português</p>
                </button>
                <button type="button" onClick={setEnLanguage} className={styles.en}>
                    <span><img src="./icons/flag-round-us.png" alt="Português" /></span>
                    <p>English</p>
                </button>
            </div>

        </div>
    )
}