import {
  View,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  doc,
  onSnapshot,
  collection,
  query,
} from "firebase/firestore";
import { Text, Button, ActivityIndicator, Card, IconButton } from "react-native-paper";
import { db } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import useCurrentUser from "../utils/UserData";
import styles from "../styles/Workouts.styles";

const Workouts = ({ route }) => {
  const { selectedWeek } = route.params;
  const [workouts, setWorkouts] = useState("");
  const [loading, setLoading] = useState(true);
  const [racePace, setRacePace] = useState("");
  let paceSeconds;

  const currentUser = useCurrentUser();
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(collection(db, "marathonTraining"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const workoutsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredWorkouts = workoutsArray.filter(
        (workout) => workout.week === selectedWeek
      );

      setWorkouts(filteredWorkouts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      return;
    }
    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      if (doc.exists()) {
        const racePace = doc.data().racePace;
        setRacePace(racePace.toString());
      } else {
        Alert.alert("No such document exists!");
      }
    });
    return () => unsubscribe();
  }, [currentUser]);

  const handleBack = async () => {
    try {
      navigation.goBack();
    } catch (error) {
      Alert.alert("Failed to go back");
    }
  };

  const paceIntervals = (racePace, distance) => {
    if (typeof racePace !== "string" || racePace === "") {
      return "";
    }

    const paceParts = racePace.split(":");
    const minutes = parseInt(paceParts[0]);
    const seconds = parseInt(paceParts[1]);
    paceSeconds = minutes * 60 + seconds;

    if (distance === 400) {
      paceSeconds -= 60;
    } else if (distance === 600) {
      paceSeconds -= 55;
    } else if (distance === 800) {
      paceSeconds -= 50;
    } else if (distance === 1000) {
      paceSeconds -= 45;
    } else if (distance === 1200 || distance === 3200) {
      paceSeconds -= 40;
    } else {
      paceSeconds -= 35;
    }

    const totalMinutes = Math.floor(paceSeconds / 60);
    const totalSeconds = paceSeconds % 60;
    let result = `${totalMinutes}:${
      totalSeconds < 10 ? "0" + totalSeconds : totalSeconds
    }`;

    return result;
  };

  const renderItemIntervals = ({ item }) => {
    if (
      !item ||
      !item.intervals ||
      !item.intervals.distance ||
      !item.intervals.repeats
    ) {
      return null;
    }

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

  const paceTempo = (racePace, distance) => {
    if (typeof racePace !== "string" || racePace === "") {
      return "";
    }

    const paceParts = racePace.split(":");
    const minutes = parseInt(paceParts[0]);
    const seconds = parseInt(paceParts[1]);
    paceSeconds = minutes * 60 + seconds;

    if (distance === 3 || distance === 4 || distance === 5) {
      paceSeconds -= 10;
    } else if (distance === 7 || distance === 8 || distance === 6.5) {
      paceSeconds += 5;
    } else {
      paceSeconds += 20;
    }

    const totalMinutes = Math.floor(paceSeconds / 60);
    const totalSeconds = paceSeconds % 60;
    let result = `${totalMinutes}:${
      totalSeconds < 10 ? "0" + totalSeconds : totalSeconds
    }`;

    return result;
  };

  const renderItemTempo = ({ item }) => {
    return (
      <View>
        {item.tempo.distance.map((distance, index) => (
          <View key={index} style={styles.taskItemTempo}>
            <Text style={styles.taskTextTempo}>{distance}km</Text>
            {item.tempo.pace[index] !== "easy" ? (
              <Text style={styles.taskTextTempo}>
                @ {paceTempo(racePace, item.tempo.distance[index])}
              </Text>
            ) : (
              <Text style={styles.taskTextTempo}>easy</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  const paceLongRun = (racePace, distance) => {
    if (typeof racePace !== "string" || racePace === "") {
      return "";
    }

    const paceParts = racePace.split(":");
    const minutes = parseInt(paceParts[0]);
    const seconds = parseInt(paceParts[1]);
    
    if (distance === 42) {
      paceSeconds = minutes * 60 + seconds;
    } else {
      paceSeconds = minutes * 60 + seconds + 30;
    }

    const totalMinutes = Math.floor(paceSeconds / 60);
    const totalSeconds = paceSeconds % 60;
    let result = `${totalMinutes}:${
      totalSeconds < 10 ? "0" + totalSeconds : totalSeconds
    }`;

    return result;
  };

  const renderItemLongRun = ({ item }) => {
    return (
      <View style={styles.taskItemTempo}>
        <Text style={styles.taskTextTempo}>{item.longRun.distance}km</Text>
        <Text style={styles.taskTextTempo}>
          @ {paceLongRun(racePace, item.longRun.distance)}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingContainer}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleBack}
          iconColor="#322eb8"
        />
        <Text style={styles.title}>Week {selectedWeek}</Text>
      </View>
      <Card style={styles.card} mode="contained">
        <Card.Title title="Intervals" titleVariant="titleMedium" />
        <Card.Content>
          {loading ? (
            <ActivityIndicator animating size="large" />
          ) : (
            workouts.map((item) => (
              <View key={item.id}>{renderItemIntervals({ item })}</View>
            ))
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="contained">
        <Card.Title title="Tempo" titleVariant="titleMedium" />
        <Card.Content>
          {loading ? (
            <ActivityIndicator animating size="large" />
          ) : (
            workouts.map((item) => (
              <View key={item.id}>{renderItemTempo({ item })}</View>
            ))
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="contained">
        <Card.Title title="Long Run" titleVariant="titleMedium" />
        <Card.Content>
          {loading ? (
            <ActivityIndicator animating size="large" />
          ) : (
            workouts.map((item) => (
              <View key={item.id}>{renderItemLongRun({ item })}</View>
            ))
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default Workouts;
