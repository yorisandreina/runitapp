import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ResetModal from "./ResetModal";
import { PaperProvider } from "react-native-paper";

const mockNavigate = jest.fn();
const mockHandleLogout = jest.fn();

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
}));

describe("ResetModal", () => {
  it("should render the modal elements when visible", async () => {
    // Arrange
    const { getByText } = render(
      <PaperProvider>
        {" "}
        <ResetModal
          visible={true}
          onDismiss={() => {}}
          navigation={{ navigate: mockNavigate }}
          handleLogout={mockHandleLogout}
        />
      </PaperProvider>
    );

    // Assert
    expect(getByText("My Achievements")).toBeTruthy();
    expect(getByText("Reset Marks")).toBeTruthy();
    expect(getByText("Logout")).toBeTruthy();

    // Act
    fireEvent.press(getByText("My Achievements"));
    expect(mockNavigate).toHaveBeenCalledWith("MyAchievements");

    fireEvent.press(getByText("Reset Marks"));
    expect(mockNavigate).toHaveBeenCalledWith("RaceDetails");

    fireEvent.press(getByText("Logout"));
    expect(mockHandleLogout).toHaveBeenCalled();
  });

  it("should not render modal elements when not visible", async () => {
    // Arrange
    const { queryByText } = render(
      <PaperProvider>
        {" "}
        <ResetModal
          visible={false}
          onDismiss={() => {}}
          navigation={{ navigate: mockNavigate }}
          handleLogout={mockHandleLogout}
        />
      </PaperProvider>
    );

    // Assert
    expect(queryByText("My Achievements")).toBeNull();
    expect(queryByText("Reset Marks")).toBeNull();
    expect(queryByText("Logout")).toBeNull();
  });
});
