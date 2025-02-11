import React from "react";
import { View, ScrollView, Alert } from "react-native";
import { Text, IconButton } from "react-native-paper";
import useFetchWorkouts from "../hooks/FetchWorkouts";
import useFetchRacePace from "../hooks/FetchRacePace";
import { paceIntervals, paceTempo, paceLongRun } from "../hooks/workouts/Pacing";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/Workouts.styles";
import WorkoutCard from "../components/WorkoutCard";

/**
 * Workouts screen component that displays the week's workouts, including intervals, tempo, and long runs.
 * The workouts are fetched from the server, and the pacing for each workout type is calculated based on the race pace.
 */
const Workouts = ({ route }) => {
  const { selectedWeek } = route.params;
  const { workouts, loading } = useFetchWorkouts(selectedWeek);
  const racePace = useFetchRacePace();
  const navigation = useNavigation();

  const handleBack = () => {
    try {
      navigation.goBack();
    } catch (error) {
      Alert.alert("Failed to go back");
    }
  };

  /**
   * Renders the intervals section for each workout item.
   * @param {object} param0 Contains the workout item.
   * @returns {JSX.Element} The rendered intervals section.
   */
  const renderItemIntervals = ({ item }) => {
    if (!item || !item.intervals) return null;

    const isArray = Array.isArray(item.intervals.distance);
    const data = isArray ? item.intervals.distance : [item.intervals.distance];
    const repeats = isArray ? item.intervals.repeats : [item.intervals.repeats];
    const RI = isArray ? item.intervals.RI : [item.intervals.RI];

    return (
      <View>
        {data.map((distanceItem, index) => (
          <View key={index} style={styles.taskItemTempo}>
            <Text style={styles.taskTextTempo}>
              {repeats[index]}x{distanceItem}
            </Text>
            <Text style={styles.taskTextTempo}>
              @ {paceIntervals(racePace, distanceItem)}
            </Text>
            <Text style={styles.taskTextTempo}>RI: {RI[index]}</Text>
          </View>
        ))}
      </View>
    );
  };

  /**
   * Renders the tempo section for each workout item.
   * @param {object} param0 Contains the workout item.
   * @returns {JSX.Element} The rendered tempo section.
   */
  const renderItemTempo = ({ item }) => {
    return item.tempo.distance.map((distance, index) => (
      <View key={index} style={styles.taskItemTempo}>
        <Text style={styles.taskTextTempo}>{distance}km</Text>
        {item.tempo.pace[index] !== "easy" ? (
          <Text style={styles.taskTextTempo}>
            @{paceTempo(racePace, distance)}
          </Text>
        ) : (
          <Text style={styles.taskTextTempo}>easy</Text>
        )}
      </View>
    ));
  };

  /**
   * Renders the long run section for each workout item.
   * @param {object} param0 Contains the workout item.
   * @returns {JSX.Element} The rendered long run section.
   */
  const renderItemLongRun = ({ item }) => (
    <View style={styles.taskItemTempo}>
      <Text style={styles.taskTextTempo}>{item.longRun.distance}km</Text>
      <Text style={styles.taskTextTempo}>
        @{paceLongRun(racePace, item.longRun.distance)}
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingContainer}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleBack}
          iconColor="#322eb8"
          testID="back-button"
        />
        <Text style={styles.title}>Week {selectedWeek}</Text>
      </View>

      {["Intervals", "Tempo", "Long Run"].map((type) => (
        <WorkoutCard
          key={type}
          title={type}
          loading={loading}
          workouts={workouts}
          renderItem={
            type === "Intervals"
              ? renderItemIntervals
              : type === "Tempo"
              ? renderItemTempo
              : renderItemLongRun
          }
        />
      ))}
    </ScrollView>
  );
};

export default Workouts;
