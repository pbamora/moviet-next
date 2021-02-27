import { ExperienceBar } from "../Components/ExperienceBar";
import { Profile } from "../Components/Profile";
import { CompletedChallanges } from "../Components/CompletedChallanges";
import { CountDown } from "../Components/CountDown";
import { ChallangeBox } from "../Components/ChallangeBox";
import { ChallangesProvider } from "../contexts/ChallangesContext";
import { CountDownProvider } from "../contexts/CountDownContext";
import { ModalLevelUp } from "../Components/ModalLevelUp";
import styles from "../styles/pages/Home.module.css";

export interface ChallangesProps {
  level: number;
  currentExperience: number;
  completedChallanges: number;
}

export default function Home(props: ChallangesProps) {
  return (
    <ChallangesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      completedChallanges={props.completedChallanges}
    >
      <CountDownProvider>
        <div className={styles.container}>
          <ExperienceBar />

          <section>
            <div>
              <Profile />
              <CompletedChallanges />
              <CountDown />
            </div>
            <div>
              <ChallangeBox />
            </div>
          </section>
        </div>
      </CountDownProvider>
    </ChallangesProvider>
  );
}

export const getServerSideProps = async (ctx) => {
  const { level, currentExperience, completedChallanges } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      completedChallanges: Number(completedChallanges),
    },
  };
};
