import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/RaceDetails.styles";

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
