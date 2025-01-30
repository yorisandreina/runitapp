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
  subtitle: {
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  taskItem: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 20,
  },
  taskItemTempo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
  },
  taskText: {
    fontSize: 16,
  },
  taskTextTempo: {
    fontSize: 16,
    paddingHorizontal: 15,
  },
  deleteText: {
    fontSize: 14,
    color: "red",
  },
  deleteTextTempo: {
    fontSize: 14,
    color: "red",
  },
  logoutButton: {
    backgroundColor: "#322eb8",
    alignItems: "center",
    marginVertical: 50,
    borderRadius: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "white",
    padding: 15,
  },
  card: {
    backgroundColor: "#ffff"
  }
});

export default styles;