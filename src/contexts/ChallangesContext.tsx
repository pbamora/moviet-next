import React, { createContext, ReactNode, useEffect, useState } from "react";
import challanges from "../../challenges.json";
import Cookies from "js-cookie";
import { ModalLevelUp } from "../Components/ModalLevelUp";

interface ChallengeActiveProps {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesProviderData {
  level: number;
  currentExperience: number;
  completedChallenges: number;
  activeChallenge: ChallengeActiveProps;
  completed: boolean;
  experienceToNextLevel: number;
  isLevelUpSetModalOpen: boolean;
  levelUp: () => void;
  startNewChallange: () => void;
  completedChallange: () => void;
  failedChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  completedChallanges: number;
}

export const ChallengesContext = createContext({} as ChallengesProviderData);

export function ChallangesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level || 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience || 0
  );
  const [completedChallenges, setCompletedChallenges] = useState(
    rest.completedChallanges || 0
  );
  const [completed, setCompleted] = useState(false);

  const [isLevelUpSetModalOpen, setIsLevelUpSetModalUp] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function setOpenModalForFiveseconds() {
    setIsLevelUpSetModalUp(true);

    setTimeout(() => {
      setIsLevelUpSetModalUp(false);
    }, 5000);
  }

  function closeLevelUpModal() {
    setIsLevelUpSetModalUp(false);
  }

  function levelUp() {
    setLevel(level + 1);
    setOpenModalForFiveseconds();
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("completedChallanges", String(completedChallenges));
  }, [level, currentExperience, completedChallenges]);

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

    setCompletedChallenges(completedChallenges + 1);

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
        isLevelUpSetModalOpen,
        activeChallenge,
        completed,
        levelUp,
        startNewChallange,
        failedChallenge,
        completedChallange,
        experienceToNextLevel,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpSetModalOpen && <ModalLevelUp />}
    </ChallengesContext.Provider>
  );
}
