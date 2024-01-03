import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "217px",
    height: "42px",
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    margin: 10,
  },
  textContainer: {
    backgroundColor: "#FFFFF",
  },
  backArrow: {
    marginTop: -1,
    width: 30,
    height: 30,
    flexDirection: "row",
  },
  text: {
    flexDirection: "row",
  },
  listConteiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
});
