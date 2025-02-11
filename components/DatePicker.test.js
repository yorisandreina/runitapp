import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DatePicker from "./DatePicker";

// Mock DateTimePicker to avoid rendering native picker
jest.mock("@react-native-community/datetimepicker", () => "DateTimePicker");

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
}));

describe("DatePicker Component", () => {
  let date;
  let setShowDatePicker;
  let setDate;

  beforeEach(() => {
    date = new Date(2022, 0, 1);
    setShowDatePicker = jest.fn();
    setDate = jest.fn();
  });

  it("should render the date and calendar icon", () => {
    // Arrange and Act
    const { getByText, getByTestId } = render(
      <DatePicker
        date={date}
        showDatePicker={false}
        setShowDatePicker={setShowDatePicker}
        setDate={setDate}
      />
    );

    // Assert
    expect(getByText(date.toISOString().split("T")[0])).toBeTruthy();
    expect(getByTestId("calendar-icon")).toBeTruthy();
  });

  it("should open the DateTimePicker when the date or icon is clicked", async () => {
    // Arrange
    const { getByText, getByTestId } = render(
      <DatePicker
        date={date}
        showDatePicker={false}
        setShowDatePicker={setShowDatePicker}
        setDate={setDate}
      />
    );

    // Act and Assert
    fireEvent.press(getByText(date.toISOString().split("T")[0]));
    expect(setShowDatePicker).toHaveBeenCalledWith(true);

    // Act and Assert
    fireEvent.press(getByTestId("calendar-icon"));
    expect(setShowDatePicker).toHaveBeenCalledWith(true);
  });
});
