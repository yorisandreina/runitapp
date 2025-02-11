import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { db } from "../firebaseConfig";
import useCurrentUser from "./UserData";
import { useSaveRace } from "./UserSave";

const useRaceForm = () => {
  const [raceName, setRaceName] = useState("");
  const [date, setDate] = useState(new Date());
  const formattedDate = date.toISOString().split("T")[0];
  const [distance, setDistance] = useState("5km");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUser = useCurrentUser();
  const navigation = useNavigation();
  const { saveRace } = useSaveRace(db);

  const handleSave = async () => {
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
  };

  return {
    raceName,
    setRaceName,
    date,
    setDate,
    formattedDate,
    distance,
    setDistance,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    showDatePicker,
    setShowDatePicker,
    loading,
    handleSave,
  };
};

export default useRaceForm;