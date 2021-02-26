import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import challanges from "../../challenges.json";

interface ChallengeActiveProps {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesProviderData {
  level: number;
  currentExperience: number;
  completedChallenges: ChallengeActiveProps[];
  activeChallenge: ChallengeActiveProps;
  completed: boolean;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallange: () => void;
  completedChallange: () => void;
  failedChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesProviderData);

export function ChallangesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [completed, setCompleted] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function startNewChallange() {
    const ramdomChallengeIndex = Math.floor(Math.random() * challanges.length);
    const challenge = challanges[ramdomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo Desafio", {
        body: `Valendo ${challenge.amount}xp`,
      });
    }
  }

  function completedChallange() {
    if (!activeChallenge) {
      return;
    }

    setCompletedChallenges((result) => [...result, activeChallenge]);

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setCompleted(true);
    setActiveChallenge(null);
  }

  function failedChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience - amount;
    setCurrentExperience(finalExperience);
    setCompleted(false);

    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        completedChallenges,
        activeChallenge,
        completed,
        levelUp,
        startNewChallange,
        failedChallenge,
        completedChallange,
        experienceToNextLevel,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
