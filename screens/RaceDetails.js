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
import useCurrentUser from "../components/UserData";
import { Picker } from "@react-native-picker/picker";
import { SvgXml } from "react-native-svg";
import styles from "../styles/RaceDetails.styles";
import { TextInput, Button, Text, Icon, MD3Colors } from "react-native-paper";

const RaceDetails = () => {
  const [raceName, setRaceName] = useState("");
  const [date, setDate] = useState(new Date());
  const formattedDate = date.toISOString().split("T")[0];
  const [distance, setDistance] = useState("5km");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [show, setShow] = useState(false);

  const currentUser = useCurrentUser();
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!currentUser) {
      return;
    }

    const userRef = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );

    const querySnapshot = await getDocs(userRef);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      const userDocRef = doc(db, "users", docId);

      await setDoc(
        userDocRef,
        {
          raceName: raceName,
          raceDate: formattedDate,
          raceDistance: distance,
          racePace: `${minutes}:${seconds}`,
        },
        { merge: true }
      );

      navigation.navigate("Home");
      Alert.alert("Info saved successfully");
    } else {
      Alert.alert("No user found with this uid.");
    }
  };

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
      <Text style={styles.title}>Enter your race details</Text>
      <TextInput
        label="Race name"
        onChangeText={(text) => setRaceName(text)}
        autoCapitalize="none"
        mode="outlined"
        style={styles.input}
        outlineColor="#c9c9c9"
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
          <Picker selectedValue={distance} onValueChange={handleDistanceChange}>
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
            <Picker selectedValue={minutes} onValueChange={handleMinutesChange}>
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
            <Picker selectedValue={seconds} onValueChange={handleSecondsChange}>
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
    </View>
  );
};

export default RaceDetails;
