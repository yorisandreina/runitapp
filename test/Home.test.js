import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Home from "../screens/Home";
import { signOut } from "firebase/auth";
import { addDoc, getDoc, onSnapshot } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";

// Mock Firestore
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn(),
    getDoc: jest.fn(),
    onSnapshot: jest.fn(),
    addDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    doc: jest.fn(),
  })),
  // You can add other Firestore-related methods if used elsewhere in your code
}));

// Mock Firebase auth methods
jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn().mockReturnValue({
    currentUser: { uid: "12345" },
  }),
}));

describe("Home component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("renders loading indicator initially", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );
    const loadingIndicator = getByTestId("loading-indicator");
    expect(loadingIndicator).toBeTruthy();
  });

  it("calls signOut when the logout button is pressed", async () => {
    signOut.mockResolvedValueOnce();

    render(<Home />)

    fireEvent.press(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() => expect(signOut).toHaveBeenCalledTimes(1));
  });

  it("marks as completed successfully", async () => {
    const mockUserData = {
      raceDistance: "21km",
      raceDate: new Date(),
      raceName: "Half Marathon",
    };
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => mockUserData,
    });
    addDoc.mockResolvedValueOnce({});

    const { getByTestId, getByLabelText } = render(<Home />);

    // Open "Mark as Completed" modal
    const markAsCompletedButton = getByTestId("mark-as-completed-button");
    fireEvent.press(markAsCompletedButton);

    const finishTimeInput = getByLabelText("Finish Time");
    fireEvent.changeText(finishTimeInput, "01:45:00");

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    // Ensure addDoc is called
    await waitFor(() => expect(addDoc).toHaveBeenCalledTimes(1));
    expect(addDoc).toHaveBeenCalledWith(
      expect.objectContaining({
        raceName: "Half Marathon",
        raceDate: expect.any(Date),
        raceDistance: "21km",
        finishTime: "01:45:00",
      })
    );
  });

  it("displays the reset modal when the reset button is pressed", async () => {
    const { getByTestId, findByText } = render(<Home />);

    const resetButton = getByTestId("settings-button");
    fireEvent.press(resetButton);

    const myAchievementsButton = await findByText("My Achievements");
    expect(myAchievementsButton).toBeTruthy();
  });
});