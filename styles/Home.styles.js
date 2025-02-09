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
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
  },
  deleteText: {
    fontSize: 14,
    color: "red",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: "flex-start",
  },
  modalContainerCompleted: {
    backgroundColor: "white",
    padding: 25,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  modalBox: {
    backgroundColor: "#ffff",
    borderRadius: 20,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fffff",
    marginVertical: 10,
  },
  actionButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    padding: 18,
  },
  modalText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonContainers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  markAsCompletedButton: {
    alignItems: "center",
    width: "70%",
    backgroundColor: "#322eb8",
    borderRadius: 10,
    borderWidth: 0,
  },
  markAsCompletedText: {
    color: "#fff",
    fontWeight: "500",
  },
  titleRenderModalCompleted: {
    fontSize: 26,
    paddingTop: 20,
    paddingBottom: 20,
    marginHorizontal: 5,
    fontWeight: "600",
  },
  markAsCompletedInput: {
    padding: 15,
    marginBottom: 20,
    borderColor: "#f2f2f2",
    borderWidth: 1.5,
    borderRadius: 20,
  },
  modalSaveDataText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    padding: 15,
  },
  settingsButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    width: "15%",
    borderWidth: 0,
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
    borderRadius: 10,
    backgroundColor: "#322eb8",
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