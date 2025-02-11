import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/RaceDetails.styles";

/**
 * Custom `PacePicker` component for selecting race pace in minutes and seconds.
 *
 * This component allows the user to select the race pace in minutes and seconds,
 * represented as two dropdown pickers for each unit. The user can adjust both
 * minutes and seconds independently, and the selected values are managed via
 * the `minutes` and `seconds` props, with their respective setter functions `setMinutes`
 * and `setSeconds`.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.minutes - The currently selected minutes value for race pace.
 *   - This value should be a two-digit string (e.g., "00", "01", ..., "59").
 * @param {Function} props.setMinutes - The callback function to update the `minutes` value.
 *   - This function is called when the user selects a new minute value.
 * @param {string} props.seconds - The currently selected seconds value for race pace.
 *   - This value should be a two-digit string (e.g., "00", "01", ..., "59").
 * @param {Function} props.setSeconds - The callback function to update the `seconds` value.
 *   - This function is called when the user selects a new second value.
 * 
 * @returns {JSX.Element} A `View` containing two `Picker` components for selecting minutes and seconds.
 */
const PacePicker = ({ minutes, setMinutes, seconds, setSeconds }) => (
  <View style={styles.paceSelectContainer}>
    <View style={styles.paceSelect}>
      <Picker selectedValue={minutes} onValueChange={setMinutes} testID="minutes-picker">
        {[...Array(60)].map((_, index) => (
          <Picker.Item
            key={index}
            label={index.toString()}
            value={index.toString().padStart(2, "0")}
          />
        ))}
      </Picker>
    </View>
    <Text>:</Text>
    <View style={styles.paceSelect}>
      <Picker selectedValue={seconds} onValueChange={setSeconds} testID="seconds-picker">
        {[...Array(60)].map((_, index) => (
          <Picker.Item
            key={index}
            label={index.toString()}
            value={index.toString().padStart(2, "00")}
          />
        ))}
      </Picker>
    </View>
  </View>
);

export default PacePicker;
