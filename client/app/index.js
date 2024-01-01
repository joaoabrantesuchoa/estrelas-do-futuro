import { SafeAreaProvider } from "react-native-safe-area-context";
import HomePage from "./homePage/index.js";

const Home = () => {
  return (
    <SafeAreaProvider>
      <HomePage />
    </SafeAreaProvider>
  );
};

export default Home;
