import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import useCurrentUser from "../utils/UserData";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/RaceDetails.styles";
import { TextInput, Button, Text, Icon, ActivityIndicator } from "react-native-paper";
import { useSaveRace } from "../utils/UserSave";

const RaceDetails = () => {
  const [raceName, setRaceName] = useState("");
  const [date, setDate] = useState(new Date());
  const formattedDate = date.toISOString().split("T")[0];
  const [distance, setDistance] = useState("5km");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUser = useCurrentUser();
  const navigation = useNavigation();

  const handleSave = async () => {
    const { saveRace } = useSaveRace(db);
    
    if (!currentUser) return;

    setLoading(true);
    try {
      const result = await saveRace(currentUser, {
        raceName,
        raceDate: formattedDate,
        raceDistance: distance,
        racePace: `${minutes}:${seconds}`,
      });

      if (result === "success") {
        navigation.navigate("Home");
        Alert.alert("Info saved successfully");
      } else {
        Alert.alert("No user found with this uid.");
      }
    } catch (error) {
      Alert.alert("Error saving data", error.message);
    } finally {
      setLoading(false);
    }
  }

  const isFormValid = () => {
    return raceName.trim() !== "" && minutes !== "00" && seconds !== "00";
  };

  const handleDistanceChange = (item) => {
    setDistance(item);
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }

    setShow(false);
    setDate(selectedDate || date);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleMinutesChange = (item) => {
    setMinutes(item);
  };

  const handleSecondsChange = (item) => {
    setSeconds(item);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Saving data...</Text>
          <ActivityIndicator size="large" color="#322eb8" />
        </View>
      )}

      {!loading && (
        <>
          <Text style={styles.title}>Enter your race details</Text>
          <TextInput
            label="Race name"
            onChangeText={(text) => setRaceName(text)}
            autoCapitalize="none"
            mode="outlined"
            style={styles.input}
            outlineColor="#c9c9c9"
            testID="race-name-input"
          />
          <Text style={styles.subtitle}>Race date</Text>
          <View style={styles.dateSelectContainer}>
            <TouchableOpacity onPress={showDatepicker}>
              <Text>{formattedDate ? formattedDate : "Choose date"}</Text>
            </TouchableOpacity>

            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TouchableOpacity onPress={showDatepicker}>
              <Icon source="calendar" color="#322eb8" size={22} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.subtitle}>Race distance</Text>
            <View style={styles.select}>
              <Picker
                selectedValue={distance}
                onValueChange={handleDistanceChange}
                testID="distance-picker"
              >
                <Picker.Item label="5km" value="5km" />
                <Picker.Item label="10km" value="10km" />
                <Picker.Item label="21km" value="21km" />
                <Picker.Item label="42km" value="42km" />
              </Picker>
            </View>
          </View>
          <View>
            <Text style={styles.subtitle}>Goal pace</Text>
            <View style={styles.paceSelectContainer}>
              <View style={styles.paceSelect}>
                <Picker
                  selectedValue={minutes}
                  onValueChange={handleMinutesChange}
                >
                  {[...Array(60)].map((_, index) => (
                    <Picker.Item
                      key={index}
                      label={index.toString().padStart(1, "0")}
                      value={index.toString().padStart(2, "0")}
                    />
                  ))}
                </Picker>
              </View>
              <Text>:</Text>
              <View style={styles.paceSelect}>
                <Picker
                  selectedValue={seconds}
                  onValueChange={handleSecondsChange}
                >
                  {[...Array(60)].map((_, index) => (
                    <Picker.Item
                      key={index}
                      label={index.toString().padStart(2, "0")}
                      value={index.toString().padStart(2, "0")}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
          <Button
            onPress={handleSave}
            style={[
              styles.button,
              { backgroundColor: isFormValid() ? "#322eb8" : "#c9c9c9" },
            ]}
            disabled={!isFormValid()}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Button>
        </>
      )}
    </View>
  );

};

export default RaceDetails;
