import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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

const RaceDetails = () => {
  const [raceName, setRaceName] = useState("");
  const [date, setDate] = useState(new Date());
  const formattedDate = date.toISOString().split("T")[0];
  const [distance, setDistance] = useState("5km");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

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

  const handleDistanceChange = (item) => {
    setDistance(item);
  };

  const handleDateChange = (date, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
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
        style={styles.input}
        placeholder="Race Name"
        onChangeText={(text) => setRaceName(text)}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.subtitle}>Race date</Text>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          accentColor="#322eb8"
          onChange={handleDateChange}
          style={styles.datePicker}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.subtitle}>Race distance</Text>
        <Picker
          selectedValue={distance}
          onValueChange={handleDistanceChange}
          style={styles.distancePicker}
        >
          <Picker.Item label="5km" value="5km" />
          <Picker.Item label="10km" value="10km" />
          <Picker.Item label="21km" value="21km" />
          <Picker.Item label="42km" value="42km" />
        </Picker>
      </View>
      <View style={styles.pacePicker}>
        <Text style={styles.subtitle}>Goal pace</Text>
        <Picker
          selectedValue={minutes}
          onValueChange={handleMinutesChange}
          style={styles.picker}
        >
          {[...Array(60)].map((_, index) => (
            <Picker.Item
              key={index}
              label={index.toString().padStart(1, "0")}
              value={index.toString().padStart(2, "0")}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={seconds}
          onValueChange={handleSecondsChange}
          style={styles.picker}
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
      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  title: {
    fontSize: 26,
    marginTop: 40,
    marginHorizontal: 5,
    fontWeight: "600",
  },
  input: {
    borderColor: "#322eb8",
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 15,
    fontSize: 14,
    marginTop: 30,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 5,
  },
  pickerContainer: {},
  datePicker: {
    marginRight: 125,
    marginBottom: 20,
  },
  pacePicker: {
    flexDirection: "row",
    marginRight: 80,
  },
  picker: {
    flex: 1,
  },
  button: {
    backgroundColor: "#322eb8",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    padding: 15,
  },
});

export default RaceDetails;
