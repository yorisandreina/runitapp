import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Workouts from "../screens/Workouts";
import useFetchWorkouts from "../hooks/FetchWorkouts";
import useFetchRacePace from "../hooks/FetchRacePace";
import { useNavigation } from "@react-navigation/native";

jest.mock("../hooks/FetchWorkouts");
jest.mock("../hooks/FetchRacePace");
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
}));

describe("Workouts Component", () => {
  const mockNavigation = { goBack: jest.fn() };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
  });

  it("renders the correct week title", () => {
    // Arrange
    useFetchWorkouts.mockReturnValue({ workouts: [], loading: false });
    useFetchRacePace.mockReturnValue("5:00");

    const { getByText } = render(
      <Workouts route={{ params: { selectedWeek: 3 } }} />
    );

    // Assert
    expect(getByText("Week 3")).toBeTruthy();
  });

  it("calls navigation.goBack when the back button is pressed", () => {
    // Arrange
    useFetchWorkouts.mockReturnValue({ workouts: [], loading: false });
    useFetchRacePace.mockReturnValue("5:00");

    const { getByTestId } = render(
      <Workouts route={{ params: { selectedWeek: 3 } }} />
    );

    // Act
    fireEvent.press(getByTestId("back-button"));

    // Assert
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it("renders workouts when loading is false", () => {
    // Arrange
    useFetchWorkouts.mockReturnValue({
      workouts: [
        {
          id: "1",
          intervals: { distance: [400], repeats: [4], RI: ["1 min"] },
          tempo: { distance: [5], pace: ["moderate"] },
          longRun: { distance: 15 },
        },
      ],
      loading: false,
    });

    useFetchRacePace.mockReturnValue("5:00");

    const { getByText } = render(
      <Workouts route={{ params: { selectedWeek: 3 } }} />
    );

    // Assert
    expect(getByText("4x400")).toBeTruthy();
    expect(getByText("RI: 1 min")).toBeTruthy();
    expect(getByText("5km")).toBeTruthy();
    expect(getByText("15km")).toBeTruthy();
  });
});
