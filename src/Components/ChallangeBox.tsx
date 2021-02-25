import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallangesContext";
import styles from "../styles/components/ChallangeBox.module.css";

export function ChallangeBox() {
  const {
    activeChallenge,
    completedChallange
  } = useContext(ChallengesContext);

  return (
    <div className={styles.challangeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeHasActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              onClick={() => console.log('falhei')}
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              type="button"
              onClick={completedChallange}
              className={styles.challangeSucceededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="level up" />
            Avance de level completando desafios!
          </p>
        </div>
      )}
    </div>
  );
}
