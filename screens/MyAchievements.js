import { View, ScrollView, ActivityIndicator } from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/Achievements.styles";

const MyAchievements = () => {
  const [userData, setUserData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const getUserData = async () => {
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();
          setUserData((prevUserData) => ({
            ...prevUserData,
            uid: userData.uid,
          }));
        };
        getUserData();
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userData) {
      const getAchievements = async () => {
        setLoading(true);
        try {
          const q = query(
            collection(db, "usersCompletedRaces"),
            where("uid", "==", userData.uid)
          );

          const achievementsQuerySnapshot = await getDocs(q);

          const achievements = achievementsQuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setAchievements(achievements);
        } catch (error) {
          console.error("Error fetching achievements:", error);
        } finally {
          setLoading(false);
        }
      };
      getAchievements();
    }
  }, [userData]);

  const handleLogout = async () => {
    try {
      navigation.navigate("Login");
      Alert.alert("Logged out successfully");
    } catch (error) {
      Alert.alert("Failed to log out");
    }
  };

  const handleBack = async () => {
    try {
      navigation.goBack();
    } catch (error) {
      Alert.alert("Failed to go back");
    }
  };

  const renderAchievement = (achievements) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{achievements.raceName}</Text>
      <Text>{achievements.raceDistance}</Text>
      <Text>{achievements.finishTime}</Text>
      <Text>{achievements.raceDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleBack}
          iconColor="#322eb8"
        />
        <Text variant="titleLarge" style={styles.title}>
          My Achievements
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#322eb8"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView>
          {achievements.length > 0 ? (
            achievements.map((item) => (
              <Card key={item.id} mode="contained" style={styles.card}>
                <Card.Content>{renderAchievement(item)} </Card.Content>
              </Card>
            ))
          ) : (
            <Text style={styles.noAchievementsText}>No achievements found</Text>
          )}
        </ScrollView>
      )}

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Button>
    </View>
  );
};

export default MyAchievements;