import React from "react";
import { View } from "react-native";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import useRaceForm from "../hooks/RaceForm";
import RaceNameInput from "../components/RaceNameInput";
import DatePicker from "../components/DatePicker";
import DistancePicker from "../components/DistancePicker";
import PacePicker from "../components/PacePicker";
import styles from "../styles/RaceDetails.styles";

const RaceDetails = () => {
  const {
    raceName,
    setRaceName,
    date,
    setDate,
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
  } = useRaceForm();

  const isFormValid =
    raceName.trim() !== "" && minutes !== "00" && seconds !== "00";

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
          <RaceNameInput value={raceName} onChange={setRaceName} />
          <Text style={styles.subtitle}>Race date</Text>
          <DatePicker
            date={date}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            setDate={setDate}
          />
          <Text style={styles.subtitle}>Race distance</Text>
          <DistancePicker
            selectedValue={distance}
            onValueChange={setDistance}
          />
          <Text style={styles.subtitle}>Goal pace</Text>
          <PacePicker
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
          />
          <Button
            onPress={handleSave}
            disabled={!isFormValid}
            mode="contained"
            style={[
              styles.button,
              { backgroundColor: isFormValid ? "#322eb8" : "#c9c9c9" },
            ]}
          >
            Save
          </Button>
        </>
      )}
    </View>
  );
};

export default RaceDetails;