import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textContainer: {
    textAlign: "left",
  },
  buttonContainer: {
    width: 200,
    height: 40,
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
    marginTop: 5,
  },
});
