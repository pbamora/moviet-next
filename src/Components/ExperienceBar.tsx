import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallangesContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext
  );

  const percentToNextLevel = Math.round(
    (currentExperience * 100) / experienceToNextLevel
  );

  return (
    <header className={styles.experienceBar}>
      <span>0xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}></div>
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExperience}
        </span>
      </div>
      <span>{experienceToNextLevel}</span>
    </header>
  );
}
