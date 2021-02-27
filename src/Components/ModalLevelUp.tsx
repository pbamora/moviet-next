import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallangesContext";
import styles from "../styles/components/LevelUpModal.module.css";

export function ModalLevelUp() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.levelUpModalContainer}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcaçou um novo nível</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button>
      </div>
    </div>
  );
}
