import { View, ScrollView, ActivityIndicator } from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/Achievements.styles";
import useFetchUserData from "../hooks/FetchUserData";
import useFetchAchievements from "../hooks/FetchAchievements";

/**
 * MyAchievements screen component that displays a user's achievements.
 * It shows a loading indicator while fetching data, and renders a list of achievements once loaded.
 */
const MyAchievements = () => {
  const navigation = useNavigation();
  const userData = useFetchUserData(navigation);
  const { achievements, loading } = useFetchAchievements(userData?.uid);

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

  /**
   * Renders an individual achievement item.
   * @param {Object} achievement - The achievement object containing race data.
   * @returns {JSX.Element} A view containing the achievement details.
   */
  const renderAchievement = (achievement) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{achievement.raceName}</Text>
      <Text>{achievement.raceDistance}</Text>
      <Text>{achievement.finishTime}</Text>
      <Text>{achievement.raceDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#322eb8"
            testID="loading-indicator"
          />
        </View>
      ) : (
        <>
          <View style={styles.headingContainer}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={handleBack}
              iconColor="#322eb8"
              testID="back-button"
            />
            <Text variant="titleLarge" style={styles.title}>
              My Achievements
            </Text>
          </View>

          <ScrollView>
            {achievements.length > 0 ? (
              achievements.map((item) => (
                <Card key={item.id} mode="contained" style={styles.card}>
                  <Card.Content>{renderAchievement(item)}</Card.Content>
                </Card>
              ))
            ) : (
              <Text style={styles.noAchievementsText}>
                No achievements found
              </Text>
            )}
          </ScrollView>

          <Button
            mode="contained"
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Button>
        </>
      )}
    </View>
  );
};

export default MyAchievements;