import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DistancePicker from "../components/DistancePicker";

describe("DistancePicker Component", () => {
  test("renders correctly", () => {
    // Arrange and Act
    const mockOnValueChange = jest.fn();
    const { getByTestId } = render(
      <DistancePicker />
    );

    const picker = getByTestId("distance-picker");

    // Assert
    expect(picker).toBeTruthy();
  });

  test("calls onValueChange when distance is changed", () => {
    // Arrange
    const mockOnValueChange = jest.fn();
    const { getByTestId } = render(
      <DistancePicker selectedValue="5km" onValueChange={mockOnValueChange} />
    );

    const picker = getByTestId("distance-picker");

    // Act
    fireEvent(picker, "onValueChange", "10km");

    // Assert
    expect(mockOnValueChange).toHaveBeenCalledWith("10km");
  });
});
