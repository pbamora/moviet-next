import { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallangesContext";
import styles from "../styles/components/CountDown.module.css";

let countDownTimeout: NodeJS.Timeout;

export function CountDown() {
  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const { startNewChallange, activeChallenge, completed } = useContext(
    ChallengesContext
  );

  const startCountDown = () => {
    setIsActive(true);
  };

  const resetCountDown = () => {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
  };

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallange();
    } else if (!isActive) {
      setHasFinished(false);
      resetCountDown();
    }
  }, [isActive, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countDownContainer}>
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
        <button disabled className={styles.cowntDownButton}>
          <span>Ciclo encerrado</span>
          <div></div>
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              onClick={() => resetCountDown()}
              type="button"
              className={`${styles.cowntDownButton} ${styles.cowntDownButtonActive}`}
            >
              Abandonar Ciclo
            </button>
          ) : (
            <button
              onClick={startCountDown}
              type="button"
              className={styles.cowntDownButton}
            >
              Iniciar Ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
