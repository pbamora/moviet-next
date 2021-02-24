import { ExperienceBar } from "../Components/ExperienceBar";
import { Profile } from "../Components/Profile";
import { CompletedChallanges } from "../Components/CompletedChallanges";
import { CountDown } from "../Components/CountDown";

import styles from "../styles/pages/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallanges />
          <CountDown />
        </div>
        <div></div>
      </section>
    </div>
  );
}
