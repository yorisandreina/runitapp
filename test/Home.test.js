import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import Home from "../screens/Home";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../hooks/FetchUserData", () =>
  jest.fn(() => ({
    userData: { name: "John Doe" },
  }))
);
jest.mock("../hooks/FetchWeeks", () =>
  jest.fn(() => ({
    weeks: [
      { id: "1", name: "Week 1" },
      { id: "2", name: "Week 2" },
    ],
    weeksUntilRace: 4,
    trainingType: "Marathon Training",
  }))
);

describe("<Home />", () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  it("should render the title, training cards, and buttons when weeks data is available", async () => {
    // Arrange
    const { getByText, getByTestId } = render(
      <PaperProvider>
        <Home />
      </PaperProvider>
    );

    // Assert
    expect(getByText("Marathon Training")).toBeTruthy();
    expect(getByTestId("training-card-1")).toBeTruthy();
    expect(getByTestId("training-card-2")).toBeTruthy();

    const menuButton = getByTestId("menu-button");
    const markAsCompletedButton = getByText("Mark as Completed");

    expect(menuButton).toBeTruthy();
    expect(markAsCompletedButton).toBeTruthy();
  });

  it("should open the ResetModal when the menu button is pressed", async () => {
    // Arrange
    const { getByTestId } = render(
      <PaperProvider>
        <Home />
      </PaperProvider>
    );

    // Act
    const menuButton = getByTestId("menu-button");
    fireEvent.press(menuButton);

    // Assert
    const resetModal = getByTestId("modal");
    expect(resetModal).toBeTruthy();
  });

  it('should open the CompletedModal when the "Mark as Completed" button is pressed', async () => {
    // Arrange
    const { getByText, getByTestId } = render(
      <PaperProvider>
        <Home />
      </PaperProvider>
    );

    // Act
    const markAsCompletedButton = getByText("Mark as Completed");
    fireEvent.press(markAsCompletedButton);

    // Assert
    const completedModal = getByTestId("completed-modal");
    expect(completedModal).toBeTruthy();
  });

  it("should log out when handleLogout is called", async () => {
    // Arrange
    const { getByTestId, getByText } = render(
      <PaperProvider>
        <Home />
      </PaperProvider>
    );

    // Act
    const menuButton = getByTestId("menu-button");
    fireEvent.press(menuButton);

    const resetModal = getByTestId("modal");
    fireEvent.press(resetModal);

    await waitFor(() => {
      const logoutButton = getByText("Logout");
      fireEvent.press(logoutButton);
    });

    // Assert
    expect(signOut).toHaveBeenCalledWith(auth);
    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});
