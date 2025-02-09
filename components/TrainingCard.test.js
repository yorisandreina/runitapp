import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TrainingCard from "./TrainingCard";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import styles from "../styles/Home.styles";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
}));

describe("TrainingCard Component", () => {
  const mockNavigate = jest.fn();
  const mockItem = { id: 1, week: 5 };
  const weeksUntilRace = 5;

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  it("renders the training card correctly", () => {
    // Arrange
    const { getByTestId, getByText } = render(
        <TrainingCard item={mockItem} weeksUntilRace={weeksUntilRace} />
    );

    // Assert
    expect(getByTestId("training-card-1")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
  });

  it("calls navigation with correct week when pressed", () => {
    // Arrange
    const { getByTestId } = render(
        <TrainingCard item={mockItem} weeksUntilRace={weeksUntilRace} />
    );

    // Act
    const card = getByTestId("training-card-1");
    fireEvent.press(card);

    // Assert
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("Workouts", { selectedWeek: 5 });
  });

  it("applies a different background color if it is the current week", () => {
    // Arrange
    const { getByTestId } = render(
      <TrainingCard item={mockItem} weeksUntilRace={weeksUntilRace} />
    );

    // Act
    const cardContent = getByTestId("card-content-1");
    const cardStyle = StyleSheet.flatten(cardContent.props.style);

    // Assert
    expect(cardStyle.backgroundColor).toBe(styles.currentWeek.backgroundColor);
  });

   it("applies the normal background color if it's not the current week", () => {
    // Arrange
    const { getByTestId } = render(
      <TrainingCard item={{ id: 2, week: 4 }} weeksUntilRace={weeksUntilRace} />
    );

    // Act
    const cardContent = getByTestId("card-content-2");
    const cardStyle = StyleSheet.flatten(cardContent.props.style);

    // Assert
    expect(cardStyle.backgroundColor).toBe(styles.cardContent.backgroundColor);
   });
});
