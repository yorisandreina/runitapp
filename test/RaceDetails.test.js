import React from "react";
import { render, fireEvent, } from "@testing-library/react-native";
import RaceDetails from "../screens/RaceDetails";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
}));

describe("RaceDetails Component", () => {
  it("renders correctly", () => {
    // Arrange
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <RaceDetails />
      </NavigationContainer>
    );

    // Assert
    expect(getByText("Enter your race details")).toBeTruthy();
    expect(getByTestId("race-name-input")).toBeTruthy();
    expect(getByText("Race date")).toBeTruthy();
    expect(getByText("Race distance")).toBeTruthy();
    expect(getByText("Goal pace")).toBeTruthy();
  });

  it("updates race name when input changes", () => {
    // Arrange
    const { getByTestId } = render(
      <NavigationContainer>
        <RaceDetails />
      </NavigationContainer>
    );

    // Act
    const raceNameInput = getByTestId("race-name-input");
    fireEvent.changeText(raceNameInput, "Marathon");

    // Assert
    expect(raceNameInput.props.value).toBe("Marathon");
  });
});
