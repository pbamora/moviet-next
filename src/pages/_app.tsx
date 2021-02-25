import { ChallangesProvider } from "../contexts/ChallangesContext";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChallangesProvider>
      <Component {...pageProps} />
    </ChallangesProvider>
  );
}

export default MyApp;
