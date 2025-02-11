import React from "react";
import { TextInput } from "react-native-paper";
import styles from "../styles/RaceDetails.styles";

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
