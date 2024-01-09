import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { SvgXml } from "react-native-svg";

const transparent = "rgba(0, 0, 0, 0.5)";

const Home = () => {
  const [weeks, setWeeks] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [textToDisplay, setTextToDisplay] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [finishTime, setFinishTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const getUserData = async () => {
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();
          setUserData(userData);
        };
        getUserData();
      }
    });

    return unsubscribe;
  }, [navigation]);

   useEffect(() => {
     let collectionName = "marathonTraining";
     if (userData && userData.raceDistance == "21km") {
       collectionName = "halfMarathonTraining";
     }
     switch (collectionName) {
       case "marathonTraining":
         setTextToDisplay("Marathon Training");
         break;
       case "halfMarathonTraining":
         setTextToDisplay("Half Marathon Training");
         break;
       default:
         setTextToDisplay("5k Training");
     }

     const q = query(collection(db, collectionName), where("week", "!=", ""));
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
       const weeksArray = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         week: doc.data().week,
       }));
       weeksArray.sort((a, b) => b.week - a.week);
       setWeeks(weeksArray);
       setLoading(false);

       if (userData) {
         const currentDate = new Date();
         const daysUntilRace =
           (new Date(userData.raceDate) - currentDate) / (1000 * 60 * 60 * 24);
         const weeksUntilRace = Math.ceil(daysUntilRace / 7);

         setWeeks((prevWeeks) =>
           prevWeeks.map((week) => ({ ...week, weeksUntilRace }))
         );
       }
     });
     return () => unsubscribe();
   }, [userData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
      Alert.alert("Logged out successfully");
    } catch (error) {
      Alert.alert("Failed to log out");
    }
  };

  const handleWorkouts = async (selectedWeek) => {
    try {
      navigation.navigate("Workouts", { selectedWeek: selectedWeek });
    } catch {
      Alert.alert("Failed to redirect");
    }
  };

  const handleResetCheckmarks = async () => {
    try {
      navigation.navigate("RaceDetails");
      setOpenModal(false);
    } catch {
      Alert.alert("Failed to redirect");
    }
  };

  const handleMarkAsCompleted = async () => {
    try {
      const userData = auth.userData;
      if (userData) {
        const uid = userData.uid;
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        const { raceName, raceDate, raceDistance } = userData;

        const usersCompletedRacesRef = collection(db, "usersCompletedRaces");

        await addDoc(usersCompletedRacesRef, { 
          uid,
          raceName,
          raceDate,
          raceDistance,
          finishTime: finishTime,
        });

        setModalVisible(false);
        Alert.alert("Successfully marked as completed");
        navigation.navigate("MyAchievements");
      }
    } catch (error) {
      Alert.alert("Failed to mark as completed");
    }
  };

  const handleMyAchievements = async () => {
    try {
      navigation.navigate("MyAchievements");
      setOpenModal(false);
    } catch {
      Alert.alert("Failed to navigate");
    }
  }

 function renderModalCompleted() {
    return (
      <Modal visible={modalVisible} animationType="none" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.titleRenderModalCompleted}>
                Input your finish time:
              </Text>
              <TextInput
                onChangeText={(text) => setFinishTime(text)}
                style={styles.markAsCompletedInput}
                placeholder="HH:MM:SS"
              />
              <TouchableOpacity
                style={styles.modalSaveDataButton}
                onPress={handleMarkAsCompleted}
              >
                <Text style={styles.modalSaveDataText}>Save Data</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  function renderModal() {
    return (
      <Modal visible={openModal} animationType="none" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <TouchableOpacity style={styles.actionButtons} onPress={handleMyAchievements}>
                <Text style={styles.actionButtonText}>My Achievements</Text>
                <SvgXml
                  xml={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#322eb8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`}
                  width="24"
                  height="24"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButtons}
                onPress={handleResetCheckmarks}
              >
                <Text style={styles.actionButtonText}>Reset Marks</Text>
                <SvgXml
                  xml={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#322eb8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>`}
                  width="24"
                  height="24"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButtons}
                onPress={handleLogout}
              >
                <Text style={styles.actionButtonText}>Logout</Text>
                <SvgXml
                  xml={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#322eb8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/></svg>`}
                  width="24"
                  height="24"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  const renderItem = ({ item }) => {
    const isCurrentWeek = item.week === item.weeksUntilRace;
    const textStyle = isCurrentWeek
      ? styles.currentWeek
      : styles.item;
    const textStyleText = isCurrentWeek ? styles.currentWeekText : styles.itemText;
    return (
      <View style={textStyle}>
        <Text style={textStyleText}>{item.week}</Text>
        <TouchableOpacity onPress={() => handleWorkouts(item.week)}>
          <SvgXml
            xml={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#322eb8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`}
            width="24"
            height="24"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{textToDisplay}</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={weeks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <View style={styles.buttonContainers}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setOpenModal(true)}
        >
          <SvgXml
            xml={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`}
            width="24"
            height="24"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.markAsCompletedButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.markAsCompletedText}>Mark as Completed</Text>
        </TouchableOpacity>
        {renderModalCompleted()}
        {renderModal()}
      </View>
    </View>
  );
};

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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: transparent,
  },
  modalBox: {
    backgroundColor: "#ffff",
    padding: 20,
    width: "85%",
    borderRadius: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
    borderColor: "#f2f2f2",
    borderWidth: 1.5,
    borderRadius: 20,
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
    padding: 15,
    borderRadius: 20,
  },
  markAsCompletedText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
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
  modalSaveDataButton: {
    alignItems: "center",
    backgroundColor: "#322eb8",
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 20,
  },
  modalSaveDataText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    padding: 15,
  },
  settingsButton: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    marginVertical: 30,
    borderRadius: 20,
    width: "15%",
    padding: 15,
  },
  currentWeek: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    backgroundColor: "#d6d6d6",
    borderRadius: 20,
  },
  currentWeekText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});

export default Home;
