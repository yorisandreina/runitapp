import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MyAchievements from "../screens/MyAchievements";
import useFetchUserData from "../hooks/FetchUserData";
import useFetchAchievements from "../hooks/FetchAchievements";
import { useNavigation } from "@react-navigation/native";

jest.mock("../hooks/FetchUserData");
jest.mock("../hooks/FetchAchievements");
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
}));

describe("MyAchievements Component", () => {
  const mockNavigation = { goBack: jest.fn(), navigate: jest.fn() };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
  });

  it("renders the title correctly", () => {
    // Arrange
    useFetchUserData.mockReturnValue({ uid: "12345" });
    useFetchAchievements.mockReturnValue({ achievements: [], loading: false });

    const { getByText } = render(<MyAchievements />);

    // Assert
    expect(getByText("My Achievements")).toBeTruthy();
  });

  it("calls navigation.goBack when the back button is pressed", () => {
    // Arrange
    useFetchUserData.mockReturnValue({ uid: "12345" });
    useFetchAchievements.mockReturnValue({ achievements: [], loading: false });

    const { getByTestId } = render(<MyAchievements />);

    // Act
    fireEvent.press(getByTestId("back-button"));

    // Assert
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it("displays loading indicator when loading is true", () => {
    // Arrange
    useFetchUserData.mockReturnValue({ uid: "12345" });
    useFetchAchievements.mockReturnValue({ achievements: [], loading: true });

    const { getByTestId } = render(<MyAchievements />);

    // Assert
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("renders achievements when available", () => {
    // Arrange
    useFetchUserData.mockReturnValue({ uid: "12345" });
    useFetchAchievements.mockReturnValue({
      achievements: [
        {
          id: "1",
          raceName: "Marathon",
          raceDistance: "42km",
          finishTime: "3h 30m",
          raceDate: "2023-04-15",
        },
      ],
      loading: false,
    });

    const { getByText } = render(<MyAchievements />);

    // Assert
    expect(getByText("Marathon")).toBeTruthy();
    expect(getByText("42km")).toBeTruthy();
    expect(getByText("3h 30m")).toBeTruthy();
    expect(getByText("2023-04-15")).toBeTruthy();
  });

  it("displays 'No achievements found' when no achievements exist", () => {
    // Arrange
    useFetchUserData.mockReturnValue({ uid: "12345" });
    useFetchAchievements.mockReturnValue({ achievements: [], loading: false });

    const { getByText } = render(<MyAchievements />);

    // Assert
    expect(getByText("No achievements found")).toBeTruthy();
  });
});
