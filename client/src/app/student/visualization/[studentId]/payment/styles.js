import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: 'center',
    padding: 10,
  },
  button: {
    width: 100,
    height: 50,
  },
  containerText: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 24,
    paddingRight: 10,
  },
  containerRol: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 5,
  },

  monthList: {
    maxWidth: "auto",
    maxHeight: 'auto',
    marginBottom: 4,
  },
  text: {
    alignContent: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});
