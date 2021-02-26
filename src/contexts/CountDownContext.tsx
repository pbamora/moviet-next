import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallangesContext";

interface CreateContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: () => void;
  resetCountDown: () => void;
}

interface CreateContextProps {
  children: ReactNode;
}

export const CountDownContext = createContext({} as CreateContextData);

let countDownTimeout: NodeJS.Timeout;

export function CountDownProvider({ children }: CreateContextProps) {
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
  }, [isActive, time, hasFinished]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <CountDownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountDown,
        resetCountDown,
      }}
    >
      {children}
    </CountDownContext.Provider>
  );
}
