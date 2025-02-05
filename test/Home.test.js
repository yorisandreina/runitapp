import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react-native";
import Home from "../screens/Home";
import { PaperProvider } from "react-native-paper";

// Mock Firebase and Firestore
jest.mock("firebase/auth", () => ({
  auth: {
    currentUser: { uid: "test-uid" },
  },
}));

jest.mock("firebase/firestore", () => ({
  getDoc: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn(),
}));

// Mock Firestore data
const mockUserData = {
  raceDistance: "21km",
  raceDate: "2025-05-10T00:00:00.000Z",
  uid: "test-uid",
};

describe("Home Component", () => {
  beforeEach(() => {
    // Mock the firestore calls to return the mock user data
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockUserData,
    });
  });
  
  it("renders loading state initially", () => {
    const { getByTestId } = render(
      <PaperProvider>
        <Home />
      </PaperProvider>
    );

    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("displays the correct title based on user data", async () => {
    const { getByText, findByText } = render(
      <PaperProvider>
        <Home />
      </PaperProvider>
    );

    // Wait for the loading state to disappear (loading indicator no longer present)
     await waitFor(() => {
       const loadingIndicator = screen.queryByTestId("loading-indicator");
       // Check that the loading indicator is removed from the DOM
       expect(loadingIndicator).not.toBeInTheDocument();
     });

    // Then check that the title is displayed
    await waitFor(() =>
      expect(screen.getByText("Marathon Training")).toBeTruthy()
    );
  });

  it('opens the completed modal when "Mark as Completed" button is pressed', async () => {
    const { getByText, getByTestId } = render(
      <PaperProvider>
        <Home />
      </PaperProvider>
    );

    const markAsCompletedButton = getByText("Mark as Completed");
    fireEvent.press(markAsCompletedButton);

    await waitFor(() => {
      // Check if the modal is visible
      expect(getByTestId("completed-modal")).toBeTruthy();
    });
  });

  it("opens the reset modal when the menu button is pressed", async () => {
    const { getByTestId } = render(
      <PaperProvider>
        <Home />
      </PaperProvider>
    );

    const menuButton = getByTestId("menu-button");
    fireEvent.press(menuButton);

    await waitFor(() => {
      // Check if the reset modal is visible
      expect(getByTestId("reset-modal")).toBeTruthy();
    });
  });

  it("logs the user out when the logout button is pressed", async () => {
    const { getByText, getByTestId } = render(
      <PaperProvider>
        <Home />
      </PaperProvider>
    );

    const menuButton = getByTestId("menu-button");
    fireEvent.press(menuButton);

    const logoutButton = getByText("Logout");
    fireEvent.press(logoutButton);

    await waitFor(() => {
      expect(getByText("Logged out successfully")).toBeTruthy();
    });
  });
});