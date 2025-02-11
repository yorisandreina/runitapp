import React from "react";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/RaceDetails.styles";
import { View } from "react-native";

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
