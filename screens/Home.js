import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Button,
  IconButton,
  ActivityIndicator,
  PaperProvider,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useFetchUserData from "../hooks/FetchUserData";
import useFetchWeeks from "../hooks/FetchWeeks";
import TrainingCard from "../components/TrainingCard";
import CompletedModal from "../modals/CompletedModal";
import ResetModal from "../modals/ResetModal";
import styles from "../styles/Home.styles";

/**
 * `Home` Screen
 *
 * This screen displays the user's training schedule, 
 * allows them to mark workouts as completed, 
 * and provides logout/reset options.
 */
const Home = () => {
  const navigation = useNavigation();
  const userData = useFetchUserData(navigation);
  const { weeks, weeksUntilRace, trainingType } = useFetchWeeks(userData);

  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);
  const [finishTime, setFinishTime] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate("Login");
  };

  return (
    <PaperProvider>
      {/* Show loading indicator if weeks data is not yet loaded */}
      {!weeks.length ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#322eb8"
            testID="loading-indicator"
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>{trainingType}</Text>
          <ScrollView style={styles.cardList}>
            {weeks.map((item, index) => (
              <TrainingCard
                key={item.id}
                item={item}
                weeksUntilRace={weeksUntilRace}
                handleWorkouts={() => {}}
              />
            ))}
          </ScrollView>

          <View style={styles.navbar}>
            <IconButton
              icon="menu"
              size={22}
              mode="outlined"
              color="#0000"
              onPress={() => setIsResetModalVisible(true)}
              style={styles.settingsButton}
              testID="menu-button"
            />
            <Button
              mode="outlined"
              onPress={() => setIsCompletedModalVisible(true)}
              style={styles.markAsCompletedButton}
            >
              <Text style={styles.markAsCompletedText}>Mark as Completed</Text>
            </Button>
          </View>

          <CompletedModal
            visible={isCompletedModalVisible}
            onDismiss={() => setIsCompletedModalVisible(false)}
            finishTime={finishTime}
            setFinishTime={setFinishTime}
            handleMarkAsCompleted={() => {}}
          />
          <ResetModal
            visible={isResetModalVisible}
            onDismiss={() => setIsResetModalVisible(false)}
            navigation={navigation}
            handleLogout={handleLogout}
          />
        </View>
      )}
    </PaperProvider>
  );
};

export default Home;