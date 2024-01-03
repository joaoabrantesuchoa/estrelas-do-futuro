import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
  studentIconList: {
    maxWidth: "auto",
    maxHeight: "80%",
    marginBottom: 10,
  },
  textInputContainer: {
    alignItems: "center",
    width: 324,
    height: 36,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 40,
    color: "#000",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "100",
    lineHeight: 16,
    letterSpacing: -0.3,
  },
});
