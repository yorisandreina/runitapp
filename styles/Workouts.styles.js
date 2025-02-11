import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
  },
  taskItemTempo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  taskTextTempo: {
    fontSize: 16,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "#ffff",
  },
});

export default styles;