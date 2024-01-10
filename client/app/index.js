import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomePage from "./homePage/index.js";
import { Text } from "react-native";
import { connectToServer } from "../api.js";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    connectToServer()
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <Text>Carregando...</Text>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <HomePage />
    </SafeAreaProvider>
  );
};

export default Home;
