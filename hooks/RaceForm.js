import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { db } from "../firebaseConfig";
import useCurrentUser from "./UserData";
import { useSaveRace } from "./UserSave";


/**
 * Custom hook for managing and saving race data in a form.
 *
 * This hook handles the state of various form inputs for race data, including race name,
 * date, distance, and race pace. It also provides a method to save the race data to Firestore
 * for the current user and navigate to the home screen after a successful save.
 *
 * @returns {Object} - An object containing form state and methods:
 *   - `raceName` (string): The name of the race.
 *   - `setRaceName` (function): Setter function to update the `raceName`.
 *   - `date` (Date): The selected race date.
 *   - `setDate` (function): Setter function to update the `date`.
 *   - `formattedDate` (string): The race date formatted as ISO string (YYYY-MM-DD).
 *   - `distance` (string): The selected race distance (e.g., "5km").
 *   - `setDistance` (function): Setter function to update the `distance`.
 *   - `minutes` (string): The race pace in minutes (e.g., "05").
 *   - `setMinutes` (function): Setter function to update the `minutes`.
 *   - `seconds` (string): The race pace in seconds (e.g., "10").
 *   - `setSeconds` (function): Setter function to update the `seconds`.
 *   - `showDatePicker` (boolean): Boolean indicating if the date picker is shown.
 *   - `setShowDatePicker` (function): Setter function to show/hide the date picker.
 *   - `loading` (boolean): A loading state indicating if the save operation is in progress.
 *   - `handleSave` (function): Method to handle saving the race data to Firestore.
 */
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