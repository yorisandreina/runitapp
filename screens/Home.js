import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  Modal,
  Portal,
  Provider as PaperProvider,
  IconButton,
  Card,
  Icon,
  ActivityIndicator,
} from "react-native-paper";
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
import styles from "../styles/Home.styles";

const Home = () => {
  const [weeks, setWeeks] = useState([]);
  const [weeksUntilRace, setWeeksUntilRace] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [textToDisplay, setTextToDisplay] = useState("");
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);
  const [finishTime, setFinishTime] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const fetchUserData = async () => {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) setUserData(userDoc.data());
        };
        fetchUserData();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!userData) return;

    const collectionName =
      userData.raceDistance === "21km"
        ? "halfMarathonTraining"
        : "marathonTraining";

    setTextToDisplay(
      collectionName === "marathonTraining"
        ? "Marathon Training"
        : "Half Marathon Training"
    );

    const q = query(collection(db, collectionName), where("week", "!=", ""));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const weeksArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        week: doc.data().week,
      }));
      weeksArray.sort((a, b) => b.week - a.week);
      setWeeks(weeksArray);
      setLoading(false);
    });

    if (userData) {
         const currentDate = new Date();
         const daysUntilRace =
           (new Date(userData.raceDate) - currentDate) / (1000 * 60 * 60 * 24);
         const calculateWeeksUntilRace = Math.ceil(daysUntilRace / 7);

         setWeeksUntilRace(calculateWeeksUntilRace);

       }

    return () => unsubscribe();
  }, [userData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out successfully");
      navigation.navigate("Login");
    } catch {
      Alert.alert("Failed to log out");
    }
  };

  const handleWorkouts = (selectedWeek) => {
    navigation.navigate("Workouts", { selectedWeek });
  };

  const handleMarkAsCompleted = async () => {
    try {
      if (userData) {
        const { uid } = auth.currentUser;
        const { raceName, raceDate, raceDistance } = userData;

        await addDoc(collection(db, "usersCompletedRaces"), {
          uid,
          raceName,
          raceDate,
          raceDistance,
          finishTime,
        });

        setIsCompletedModalVisible(false);
        Alert.alert("Successfully marked as completed");
        navigation.navigate("MyAchievements");
      }
    } catch {
      Alert.alert("Failed to mark as completed");
    }
  };

  const renderCompletedModal = () => (
    <Portal>
      <Modal
        visible={isCompletedModalVisible}
        onDismiss={() => setIsCompletedModalVisible(false)}
        contentContainerStyle={styles.modalContainerCompleted}
      >
          <View>
            <Text>Input your finish time:</Text>
            <TextInput
              label="Finish Time"
              value={finishTime}
              onChangeText={setFinishTime}
              mode="outlined"
              placeholder="HH:MM:SS"
              style={styles.textInput}
            />
            <Button
              mode="contained"
              onPress={handleMarkAsCompleted}
              style={styles.saveButton}
            >
              Save Data
            </Button>
          </View>
      </Modal>
    </Portal>
  );

  const renderResetModal = () => (
    <Portal>
      <Modal
        visible={isResetModalVisible}
        onDismiss={() => setIsResetModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalItem}>
            <Icon source="trophy" color="#322eb8" size={22} />
            <Button
              mode="text"
              textColor="black"
              onPress={() => {
                setIsResetModalVisible(false);
                navigation.navigate("MyAchievements");
              }}
            >
              My Achievements
            </Button>
          </View>
          <View style={styles.modalItem}>
            <Icon source="square-edit-outline" color="#322eb8" size={22} />
            <Button
              mode="text"
              textColor="black"
              onPress={() => navigation.navigate("RaceDetails")}
            >
              Reset Marks
            </Button>
          </View>
          <View style={styles.modalItem}>
            <Icon source="logout" color="#322eb8" size={22} />
            <Button
              mode="text"
              textColor="black"
              onPress={handleLogout}
            >
              Logout
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );

  return (
    <PaperProvider>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#322eb8" testID="loading-indicator" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>{textToDisplay}</Text>
          <ScrollView style={styles.cardList}>
            {weeks.map((item) => {
              const isCurrentWeek = item.week === weeksUntilRace;
              const cardContent = isCurrentWeek
                ? styles.currentWeek
                : styles.cardContent;
              const textStyle = isCurrentWeek
                ? styles.currentWeekText
                : styles.cardText;

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleWorkouts(item.week)}
                  activeOpacity={0.8}
                >
                  <Card style={styles.card}>
                    <Card.Content style={cardContent}>
                      <Text style={textStyle}>{item.week}</Text>
                      <Icon source="arrow-right" color="#322eb8" size={22} />
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.navbar}>
            <IconButton
              icon="menu"
              size={22}
              mode="outlined"
              color="#0000"
              onPress={() => setIsResetModalVisible(true)}
              style={styles.settingsButton}
            >
            </IconButton>
            <Button
              mode="outlined"
              onPress={() => setIsCompletedModalVisible(true)}
              style={styles.markAsCompletedButton}
            >
              <Text style={styles.markAsCompletedText}>Mark as Completed</Text>
            </Button>
          </View>
          {renderCompletedModal()}
          {renderResetModal()}
        </View>
      )}
    </PaperProvider>
  );
};

export default Home;