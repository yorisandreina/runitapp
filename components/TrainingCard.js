import React from "react";
import { TouchableOpacity } from "react-native";
import { Card, Icon, Text } from "react-native-paper";
import styles from "../styles/Home.styles";
import { useNavigation } from "@react-navigation/native";

const TrainingCard = ({ item, weeksUntilRace }) => {
  const isCurrentWeek = item.week === weeksUntilRace;
  const cardContent = isCurrentWeek ? styles.currentWeek : styles.cardContent;
  const textStyle = isCurrentWeek ? styles.currentWeekText : styles.cardText;
  const navigation = useNavigation();

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
