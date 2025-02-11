import React from "react";
import { View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, Icon } from "react-native-paper";
import styles from "../styles/RaceDetails.styles";

/**
 * Custom `DatePicker` component for selecting a date in the app.
 *
 * This component displays the currently selected date and allows the user to choose a new date 
 * using a date picker. It includes a calendar icon and displays the selected date in an ISO format.
 * The date picker is shown when the user taps on the date or the calendar icon.
 *
 * @param {Object} props - The component's props.
 * @param {Date} props.date - The currently selected date to be displayed.
 *   - The date should be a JavaScript `Date` object.
 * @param {boolean} props.showDatePicker - A flag to show or hide the date picker.
 *   - `true` will show the date picker, `false` will hide it.
 * @param {Function} props.setShowDatePicker - A function to set the `showDatePicker` state.
 *   - This function is used to toggle the visibility of the date picker.
 * @param {Function} props.setDate - A function to set the `date` state with a new selected date.
 *   - This function is called when a new date is chosen from the date picker.
 * 
 * @returns {JSX.Element} A `View` containing the date display, date picker, and calendar icon.
 */
const DatePicker = ({ date, showDatePicker, setShowDatePicker, setDate }) => {
  /**
   * Handler function for the date change event.
   *
   * This function is triggered when the user selects a date or dismisses the picker.
   * If the picker is dismissed, it hides the date picker. If a date is selected, it updates
   * the `date` state with the new selected date.
   *
   * @param {Object} event - The event object from the date picker.
   *   - `type` {string} - The type of the event (e.g., "set" for a date selection or "dismissed").
   * @param {Date} selectedDate - The date selected by the user.
   */
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
