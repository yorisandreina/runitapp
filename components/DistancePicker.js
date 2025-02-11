import React from "react";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/RaceDetails.styles";
import { View } from "react-native";

/**
 * Custom `DistancePicker` component for selecting race distance.
 *
 * This component renders a dropdown picker for selecting the race distance. It allows
 * the user to choose between distances: 5km, 10km, 21km, and 42km. The selected
 * value is managed via the `selectedValue` prop, and any changes to the selection
 * trigger the `onValueChange` callback.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.selectedValue - The currently selected race distance.
 *   - This value can be one of the following strings: "5km", "10km", "21km", or "42km".
 * @param {Function} props.onValueChange - The callback function to handle changes
 *   in the selected race distance.
 *   - This function is called when the user selects a new value from the picker.
 * 
 * @returns {JSX.Element} A `View` containing a `Picker` component with distance options.
 */
const DistancePicker = ({ selectedValue, onValueChange }) => (
  <View style={styles.select}>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      testID="distance-picker"
    >
      <Picker.Item label="5km" value="5km" />
      <Picker.Item label="10km" value="10km" />
      <Picker.Item label="21km" value="21km" />
      <Picker.Item label="42km" value="42km" />
    </Picker>
  </View>
);

export default DistancePicker;
