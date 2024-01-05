import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  imageContainer: {
    width: 150,
    height: 150,
    flexShrink: 0,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
  },
  imageText: {
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "100",
    letterSpacing: -0.3,
    opacity: 0.5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
  text: {
    fontSize: 14,
    textAlign: "left",
  },
  studentDataContainer: {
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    margin: 10,
  },
  columnContainer: {
    flexDirection: "row",
  },
  columnLeft: {
    alignContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 10,
    flex: 0.5,
  },
  columnRight: {
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
    flex: 0.5,
  },
});
