import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    paddingTop: 40,
    paddingBottom: 20,
    marginHorizontal: 5,
    fontWeight: "600",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 5,
    alignItems: "flex-start",
  },
  modalContainerCompleted: {
    backgroundColor: "white",
    padding: 25,
    marginHorizontal: 30,
    borderRadius: 5,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fffff",
    marginVertical: 10,
  },
  markAsCompletedButton: {
    alignItems: "center",
    width: "70%",
    backgroundColor: "#322eb8",
    borderRadius: 5,
    borderWidth: 0,
  },
  markAsCompletedText: {
    color: "#fff",
    fontWeight: "500",
  },
  settingsButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    width: "15%",
    borderWidth: 0,
    padding: 5,
  },
  currentWeek: {
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
    backgroundColor: "#c9c9c9",
    padding: 30,
  },
  currentWeekText: {
    fontSize: 16,
    color: "#555",
  },
  cardList: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffff",
    marginVertical: 8,
    borderWidth: 0,
  },
  cardContent: {
    flexDirection: "row",
    borderRadius: 8,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 30,
  },
  cardText: {
    fontSize: 16,
    color: "#555",
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  textInput: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  saveButton: {
    borderRadius: 5,
    backgroundColor: "#322eb8",
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});

export default styles;