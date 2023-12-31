import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  homePageBrassImage: {
    flex: 1,
    width: 247,
    height: 240,
    resizeMode: "contain",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center,",
  },
  button: {
    width: 229,
    height: 42,
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
