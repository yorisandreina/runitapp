import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "700",
  },
  logoutButton: {
    alignItems: "center",
    backgroundColor: "#322eb8",
    padding: 5,
    borderRadius: 10,
  },
  logoutText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#ffff",
  },
});

export default styles;