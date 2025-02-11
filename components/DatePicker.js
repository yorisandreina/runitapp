import React from "react";
import { View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, Icon } from "react-native-paper";
import styles from "../styles/RaceDetails.styles";

const DatePicker = ({ date, showDatePicker, setShowDatePicker, setDate }) => {
  const handleDateChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    setShowDatePicker(false);
    setDate(selectedDate || date);
  };

  return (
    <View style={styles.dateSelectContainer}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text>{date.toISOString().split("T")[0]}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          testID="datetime-picker"
        />
      )}

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        testID="calendar-icon"
      >
        <Icon source="calendar" color="#322eb8" size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default DatePicker;
