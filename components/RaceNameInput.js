import React from "react";
import { TextInput } from "react-native-paper";
import styles from "../styles/RaceDetails.styles";

/**
 * Custom `RaceNameInput` component for inputting the name of the race.
 *
 * This component renders a `TextInput` field where the user can type the name of the race.
 * It includes basic configuration such as a label, value binding, and an `onChange` callback
 * for handling updates to the race name. The input is styled using the `styles.input` style
 * and has a default outline color.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.value - The current value of the race name input field.
 *   - This value is displayed in the `TextInput` field.
 * @param {Function} props.onChange - The callback function to handle changes in the input field.
 *   - This function is called every time the user types in the `TextInput` field.
 * 
 * @returns {JSX.Element} A `TextInput` field that allows the user to input the race name.
 */
const RaceNameInput = ({ value, onChange }) => (
  <TextInput
    label="Race name"
    value={value}
    onChangeText={onChange}
    autoCapitalize="none"
    mode="outlined"
    style={styles.input}
    outlineColor="#c9c9c9"
    testID="race-name-input"
  />
);

export default RaceNameInput;
