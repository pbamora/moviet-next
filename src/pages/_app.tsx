import { ChallangesProvider } from "../contexts/ChallangesContext";
import {
  CountDownContext,
  CountDownProvider,
} from "../contexts/CountDownContext";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChallangesProvider>
      <CountDownProvider>
        <Component {...pageProps} />
      </CountDownProvider>
    </ChallangesProvider>
  );
}

export default MyApp;
