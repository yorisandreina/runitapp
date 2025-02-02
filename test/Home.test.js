import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { signOut } from "firebase/auth";
import { addDoc, getDoc } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    addListener: jest.fn(),
  })),
}));

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn().mockReturnValue({
    currentUser: { uid: "12345" },
  }),
}));

describe("Home component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading indicator initially", () => {
    const { getByTestId } = render(<Home />);
    const loadingIndicator = getByTestId("loading-indicator");
    expect(loadingIndicator).toBeTruthy();
  });

  it("calls signOut when the logout button is pressed", async () => {
    signOut.mockResolvedValueOnce();

    const { getByRole, getByTestId } = render(<Home />);

    // Wait for the IconButton to be available
    await waitFor(() => getByTestId("menu-button"));

    // Simulate clicking the IconButton
    const iconButton = getByTestId("menu-button");
    fireEvent.press(iconButton);

    // Now simulate clicking the Logout Button inside the modal
    const logoutButton = getByRole("button", { name: "Logout" });
    fireEvent.press(logoutButton);

    // Ensure signOut was called once
    await waitFor(() => expect(signOut).toHaveBeenCalledTimes(1));
  });

  it("marks as completed successfully", async () => {
    const mockUserData = {
      raceDistance: "21km",
      raceDate: new Date(),
      raceName: "Half Marathon",
    };

    // Mock Firestore behavior
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => mockUserData,
    });
    addDoc.mockResolvedValueOnce({});

    render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );

    // Open "Mark as Completed" modal
    const markAsCompletedButton = screen.getByTestId(
      "mark-as-completed-button"
    );
    fireEvent.press(markAsCompletedButton);

    const finishTimeInput = screen.getByLabelText("Finish Time");
    fireEvent.changeText(finishTimeInput, "01:45:00");

    const saveButton = screen.getByTestId("save-button");
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
    render(<Home />);

    const resetButton = screen.getByTestId("menu-button");
    fireEvent.press(resetButton);

    const myAchievementsButton = await screen.findByText("My Achievements");
    expect(myAchievementsButton).toBeTruthy();
  });
});