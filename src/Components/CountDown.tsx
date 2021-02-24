import { useEffect, useState } from "react";
import styles from "../styles/components/CountDown.module.css";

export function CountDown() {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active || time === 0) return;
    setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  }, [active, time]);

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

      <button
        onClick={() => setActive(!active)}
        type="button"
        className={styles.cowntDownButton}
      >
        {active === true ? "Encerrar Ciclo" : "Ativar Ciclo"}
      </button>
    </div>
  );
}
