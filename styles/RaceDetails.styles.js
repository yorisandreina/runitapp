import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    fontSize: 14,
    marginVertical: 15,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#322eb8",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 5,
    padding: 5,
  },
  paceSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  select: {
    width: "100%",
    borderRadius: 5,
    marginVertical: 15,
    borderColor: "#c9c9c9",
    borderWidth: 1,
  },
  paceSelect: {
    width: "47%",
    borderRadius: 5,
    marginVertical: 15,
    borderColor: "#c9c9c9",
    borderWidth: 1,
  },
  dateSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#c9c9c9",
    borderRadius: 5,
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default styles;