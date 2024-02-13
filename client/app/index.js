import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
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
        <View style={styles.container}>
          <Text style={styles.text}>Carregando...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <HomePage />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
