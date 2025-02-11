import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PacePicker from "../components/PacePicker";

describe("PacePicker Component", () => {
  test("renders correctly", () => {
    // Arrange and Act
    const { getByTestId } = render(
      <PacePicker />
    );

    const minutesPicker = getByTestId("minutes-picker");
    const secondsPicker = getByTestId("seconds-picker");

    // Assert
    expect(minutesPicker).toBeTruthy();
    expect(secondsPicker).toBeTruthy();
  });

  test("calls setMinutes when minutes picker is changed", () => {
    // Arrange
    const mockSetMinutes = jest.fn();
    const { getByTestId } = render(
      <PacePicker minutes="05" setMinutes={mockSetMinutes} seconds="30" setSeconds={() => {}} />
    );

    const minutesPicker = getByTestId("minutes-picker");

    // Act
    fireEvent(minutesPicker, "onValueChange", "10");

    // Assert
    expect(mockSetMinutes).toHaveBeenCalledWith("10");
  });

  test("calls setSeconds when seconds picker is changed", () => {
    // Arrange
    const mockSetSeconds = jest.fn();
    const { getByTestId } = render(
      <PacePicker minutes="05" setMinutes={() => {}} seconds="30" setSeconds={mockSetSeconds} />
    );

    const secondsPicker = getByTestId("seconds-picker");

    // Act
    fireEvent(secondsPicker, "onValueChange", "45");

    // Assert
    expect(mockSetSeconds).toHaveBeenCalledWith("45");
  });
});
