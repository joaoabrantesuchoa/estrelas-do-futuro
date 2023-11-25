import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

function HomePage(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3a3d8c4-74dd-4ef4-80c9-99dc6f2b555c?apiKey=fd6afd361a0f4b339d9fff46b2790faa&",
        }}
        style={styles.image4}
      >
        <TouchableOpacity style={styles.image5Container}>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/a31b1be2-d9f8-4a84-a9f7-f7565b0e441a?apiKey=fd6afd361a0f4b339d9fff46b2790faa&",
            }}
            style={styles.image5}
          >
            <Text>Lista de alunos</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.aboutContainer}>
        <Text>About</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  header: {
    alignSelf: "stretch",
    display: "flex",
    marginTop: 17,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 20,
  },
  timeContainer: {
    color: "var(--dark-1, #262626)",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 21,
  },
  imageContainer: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 5,
  },
  image1: {
    fill: "var(--dark-1, #262626)",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: 17,
    flexShrink: 0,
    maxWidth: "100%",
    flexDirection: "column",
    aspectRatio: 1.7,
  },
  image2: {
    fill: "var(--dark-1, #262626)",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: 15,
    flexShrink: 0,
    maxWidth: "100%",
    flexDirection: "column",
    aspectRatio: 1.36,
  },
  image3: {
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: 25,
    flexShrink: 0,
    maxWidth: "100%",
    flexDirection: "column",
    aspectRatio: 2.08,
  },
  image4: {
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    marginTop: 50,
    width: 247,
    maxWidth: "100%",
    flexDirection: "column",
    aspectRatio: 1.03,
  },
  image5Container: {
    alignSelf: "center",
    aspectRatio: 5.45,
    marginTop: 100,
    width: 229,
    maxWidth: "100%",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    overflow: "hidden",
  },
  image5: {
    color: "#D9D9D9",
    position: "relative",
    whiteSpace: "nowrap",
    fill: "#000",
    strokeWidth: 1,
    stroke: "#000",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  aboutContainer: {
    color: "#000",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 304,
    whiteSpace: "nowrap",
    fontWeight: "100",
    fontSize: 14,
    lineHeight: 17,
  },
  separator: {
    borderRadius: 100,
    backgroundColor: "var(--dark-1, #262626)",
    alignSelf: "center",
    display: "flex",
    width: 134,
    flexShrink: 0,
    height: 5,
    flexDirection: "column",
    marginVertical: 23,
  },
});

export default HomePage;
