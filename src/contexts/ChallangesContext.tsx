import { createContext, ReactNode, useState } from "react";
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
  levelUp: () => void;
  startNewChallange: () => void;
  completedChallange: () => void;
  activeChallenge: ChallengeActiveProps;
  completed: boolean;
  experienceToNextLevel: number;
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
    if (!completedChallenges) return;

    const totalExperience = completedChallenges.map((m) => m.amount);

    console.log(totalExperience);

    // setLevel(level + 1);
  }

  function startNewChallange() {
    const ramdomChallengeIndex = Math.floor(Math.random() * challanges.length);
    const challenge = challanges[ramdomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function completedChallange() {
    setCompletedChallenges((result) => [...result, activeChallenge]);

    setCompleted(true);
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
        completedChallange,
        experienceToNextLevel,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
