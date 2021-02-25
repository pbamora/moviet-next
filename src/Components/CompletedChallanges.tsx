import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallangesContext";
import styles from "../styles/components/CompletedChallanges.module.css";

export function CompletedChallanges() {
  const { completedChallenges } = useContext(ChallengesContext);

  return (
    <div className={styles.challangesContainer}>
      <span>Desafios Completos</span>
      <span>{completedChallenges.length}</span>
    </div>
  );
}
