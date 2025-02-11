import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RaceDetails from "../screens/RaceDetails";
import useRaceForm from "../hooks/RaceForm";

jest.mock("../hooks/RaceForm");

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
}));

describe("RaceDetails Component", () => {
  beforeEach(() => {
    useRaceForm.mockReturnValue({
      raceName: "",
      setRaceName: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      distance: "5k",
      setDistance: jest.fn(),
      minutes: "00",
      setMinutes: jest.fn(),
      seconds: "00",
      setSeconds: jest.fn(),
      showDatePicker: false,
      setShowDatePicker: jest.fn(),
      loading: false,
      handleSave: jest.fn(),
    });
  });

  it("should render the RaceDetails component", () => {
    // Arrange and Act
    const { getByText } = render(<RaceDetails />);

    // Assert
    expect(getByText("Enter your race details")).toBeTruthy();
    expect(getByText("Race date")).toBeTruthy();
    expect(getByText("Race distance")).toBeTruthy();
    expect(getByText("Goal pace")).toBeTruthy();
    expect(getByText("Save")).toBeTruthy();
  });

  it("should show the loading state when loading is true", () => {
    // Arrange and Act
    useRaceForm.mockReturnValueOnce({
      ...useRaceForm(),
      loading: true,
    });

    const { getByText } = render(<RaceDetails />);

    // Assert
    expect(getByText("Saving data...")).toBeTruthy();
  });

  it("should enable the Save button when the form is valid", () => {
    // Arrange
    useRaceForm.mockReturnValueOnce({
      ...useRaceForm(),
      raceName: "My Race",
      minutes: "30",
      seconds: "10",
    });

    const { getByRole } = render(<RaceDetails />);

    // Act
    const saveButton = getByRole("button", { name: "Save" });

    // Assert
    expect(saveButton).toBeEnabled();
  });

  it("should disable the Save button when the form is invalid", () => {
    // Arrange and Act
    useRaceForm.mockReturnValueOnce({
      ...useRaceForm(),
      raceName: "",
      minutes: "00",
      seconds: "00",
    });

    const { getByRole } = render(<RaceDetails />);
    const saveButton = getByRole("button", { name: "Save" });

    // Assert
    expect(saveButton).toBeDisabled();
  });

  it("should call handleSave when Save button is pressed", async () => {
    // Arrange
    const mockHandleSave = jest.fn();

    useRaceForm.mockReturnValueOnce({
      ...useRaceForm(),
      handleSave: mockHandleSave,
      raceName: "My Race",
      minutes: "30",
      seconds: "10",
    });

    const { getByRole } = render(<RaceDetails />);
    const saveButton = getByRole("button", { name: "Save" });

    // Act
    fireEvent.press(saveButton);

    // Assert
    await waitFor(() => {
      expect(mockHandleSave).toHaveBeenCalled();
    });
  });

  it("should call setDate when a new date is selected", () => {
    // Arrange
    const mockSetDate = jest.fn();
    useRaceForm.mockReturnValueOnce({
      ...useRaceForm(),
      setDate: mockSetDate,
      showDatePicker: true,
    });

    const { getByTestId } = render(<RaceDetails />);
    const datePicker = getByTestId("datetime-picker");

    // Act
    fireEvent(datePicker, "onChange", {
      nativeEvent: { timestamp: new Date(2023, 5, 14).getTime() },
    });

    // Assert
    expect(mockSetDate).toHaveBeenCalledWith(new Date(2023, 5, 14));
  });
});
