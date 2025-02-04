import React from "react";
import { render, fireEvent, act, screen, waitFor } from "@testing-library/react-native";
import RaceDetails from "../screens/RaceDetails";
import { db } from "../firebaseConfig";
import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import useCurrentUser from "../utils/UserData";
import { Picker } from "@react-native-picker/picker";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import firestore from "firebase/firestore";

const mockFirestore = {
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(() =>
    Promise.resolve({ empty: false, docs: [{ id: "mockUserId" }] })
  ),
  doc: jest.fn(),
  setDoc: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const mockUser = { uid: "12345" };

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: mockUser,
  })),
}));


jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
}));

jest.mock("../utils/UserData");

describe("RaceDetails Component", () => {
  const mockUser = {
    uid: "123",
  };

  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockFirestore = {
    collection: jest.fn(),
    query: jest.fn(),
    getDocs: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(<RaceDetails />);

    // Check if the title and input fields are rendered
    expect(getByText("Enter your race details")).toBeTruthy();
    expect(getByTestId("race-name-input")).toBeTruthy();
    expect(getByText("Race date")).toBeTruthy();
    expect(getByText("Race distance")).toBeTruthy();
    expect(getByText("Goal pace")).toBeTruthy();
  });

  it("updates race name when input changes", () => {
    const { getByTestId } = render(<RaceDetails />);
    const raceNameInput = getByTestId("race-name-input");

    fireEvent.changeText(raceNameInput, "Marathon");
    expect(raceNameInput.props.value).toBe("Marathon");
  });

  // it("shows Save button disabled before entering data in fields", () => {
  //   render(<RaceDetails />);
  //   const saveButton = screen.getByRole("button", { name: "Save" });
  //   expect(saveButton).toBeDisabled();
  // });

  // it("should save race details and navigate when valid form is submitted", async () => {
  //   // Mock the useSaveRace hook
  //   const mockSaveRace = jest.fn().mockResolvedValue("success");
  //   jest.mock("../utils/UserSave.js", () => ({
  //     useSaveRace: () => mockSaveRace,
  //   }));

  //   const { getByText, getByTestId } = render(<RaceDetails />);

  //   // Simulate user input
  //   fireEvent.changeText(getByTestId("race-name-input"), "My Race");
  //   fireEvent(getByTestId("distance-picker"), "onValueChange", "10km");

  //   const saveButton = getByText("Save");

  //   // Simulate button press
  //   fireEvent.press(saveButton);

  //   // Wait for the async function to complete
  //   await waitFor(() => expect(mockSaveRace).toHaveBeenCalled());

  //   // Verify that saveRace was called with the correct parameters
  //   expect(mockSaveRace).toHaveBeenCalledWith(
  //     expect.any(Object), // currentUser
  //     {
  //       raceName: "My Race",
  //       raceDate: expect.any(String),
  //       raceDistance: "10km",
  //       racePace: "00:00",
  //     }
  //   );

  //   // Check if navigation happens after save
  //   expect(mockNavigation.navigate).toHaveBeenCalledWith("Home");
  // });
});
