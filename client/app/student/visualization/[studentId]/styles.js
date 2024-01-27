import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    marginBottom: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "700",
  },
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
