import {
  render,
  screen,
} from "@testing-library/react-native";

import React from "react";
import RaceDetails from "../screens/RaceDetails";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn().mockReturnValue(true),
}));

describe("RaceDetails Component", () => {
  it("renders input fields and buttons", () => {
    render(<RaceDetails />);

    expect(screen.getByTestId("race-name-input")).toBeTruthy();
    expect(screen.getByText("Race date")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
  });

  it("disables save button when fields are empty", () => {
    render(<RaceDetails />);
    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeDisabled();
  });
});