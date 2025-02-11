import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RaceNameInput from "../components/RaceNameInput";

describe("RaceNameInput Component", () => {
  test("renders correctly with given value", () => {
    // Arrange and Act
    const { getByTestId } = render(
      <RaceNameInput value="Marathon" onChange={() => {}} />
    );

    // Assert
    const input = getByTestId("race-name-input");
    
    expect(input).toBeTruthy();
    expect(input.props.value).toBe("Marathon");
  });

  test("calls onChange function when text is entered", () => {
    // Arrange and Act
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <RaceNameInput value="" onChange={mockOnChange} />
    );

    // Assert
    const input = getByTestId("race-name-input");

    fireEvent.changeText(input, "New Race");
    expect(mockOnChange).toHaveBeenCalledWith("New Race");
  });
});
