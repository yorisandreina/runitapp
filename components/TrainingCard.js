import React from "react";
import { TouchableOpacity } from "react-native";
import { Card, Icon, Text } from "react-native-paper";
import styles from "../styles/Home.styles";
import { useNavigation } from "@react-navigation/native";

/**
 * Custom `TrainingCard` component that displays a card for each training week.
 *
 * This component represents a card that displays the training week number and allows the user to navigate
 * to the workout details for that week. The card is styled differently if it corresponds to the current week.
 * When pressed, it navigates to the "Workouts" screen, passing the selected week as a parameter.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.item - The training week data.
 *   @param {string} props.item.id - The unique ID of the training week.
 *   @param {string} props.item.week - The number representing the training week.
 * @param {number} props.weeksUntilRace - The current week of the training plan.
 * 
 * @returns {JSX.Element} A `Card` component that displays the training week and allows navigation to the workouts.
 */
const TrainingCard = ({ item, weeksUntilRace }) => {
  const isCurrentWeek = item.week === weeksUntilRace;
  const cardContent = isCurrentWeek ? styles.currentWeek : styles.cardContent;
  const textStyle = isCurrentWeek ? styles.currentWeekText : styles.cardText;
  const navigation = useNavigation();

  /**
   * Navigates to the Workouts screen with the selected week.
   *
   * @param {string} selectedWeek - The week to navigate to, passed to the "Workouts" screen.
   */
  const handleWorkouts = (selectedWeek) => {
    navigation.navigate("Workouts", { selectedWeek });
  };

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleWorkouts(item.week)}
      activeOpacity={0.8}
    >
      <Card style={styles.card} testID={`training-card-${item.id}`}>
        <Card.Content style={cardContent} testID={`card-content-${item.id}`}>
          <Text style={textStyle}>{item.week}</Text>
          <Icon source="arrow-right" color="#322eb8" size={22} />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default TrainingCard;
