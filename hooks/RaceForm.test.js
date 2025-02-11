import { renderHook, act } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import useRaceForm from "./RaceForm";
import useCurrentUser from "../hooks/UserData";
import { useSaveRace } from "../hooks/UserSave";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../hooks/UserData", () => jest.fn());
jest.mock("../hooks/UserSave", () => ({
  useSaveRace: jest.fn(),
}));

jest.mock("react-native", () => ({
  Alert: { alert: jest.fn() },
}));

describe("useRaceForm Hook", () => {
  let mockNavigation, mockSaveRace;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
    mockSaveRace = jest.fn();

    useNavigation.mockReturnValue(mockNavigation);
    useSaveRace.mockReturnValue({ saveRace: mockSaveRace });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("initial state is set correctly", () => {
    // Arrange
    useCurrentUser.mockReturnValue({ uid: "12345" });

    // Act
    const { result } = renderHook(() => useRaceForm());

    // Assert
    expect(result.current.raceName).toBe("");
    expect(result.current.distance).toBe("5km");
    expect(result.current.minutes).toBe("00");
    expect(result.current.seconds).toBe("00");
    expect(result.current.showDatePicker).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  test("updates state correctly", () => {
    // Arrange
    useCurrentUser.mockReturnValue({ uid: "12345" });

    // Act
    const { result } = renderHook(() => useRaceForm());

    act(() => result.current.setRaceName("Test Race"));
    act(() => result.current.setDistance("10km"));
    act(() => result.current.setMinutes("05"));
    act(() => result.current.setSeconds("30"));

    // Assert
    expect(result.current.raceName).toBe("Test Race");
    expect(result.current.distance).toBe("10km");
    expect(result.current.minutes).toBe("05");
    expect(result.current.seconds).toBe("30");
  });

  test("handleSave calls saveRace and navigates on success", async () => {
    // Arrange
    useCurrentUser.mockReturnValue({ uid: "12345" });
    mockSaveRace.mockResolvedValue("success");

    // Act
    const { result } = renderHook(() => useRaceForm());

    await act(async () => {
      await result.current.handleSave();
    });

    // Assert
    expect(mockSaveRace).toHaveBeenCalledWith(expect.any(Object), {
      raceName: "",
      raceDate: expect.any(String),
      raceDistance: "5km",
      racePace: "00:00",
    });
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Home");
    expect(Alert.alert).toHaveBeenCalledWith("Info saved successfully");
    expect(result.current.loading).toBe(false);
  });

  test("handleSave shows alert when saveRace fails", async () => {
    // Arrange
    useCurrentUser.mockReturnValue({ uid: "12345" });
    mockSaveRace.mockResolvedValue("failure");

    // Act
    const { result } = renderHook(() => useRaceForm());

    await act(async () => {
      await result.current.handleSave();
    });

    // Assert
    expect(Alert.alert).toHaveBeenCalledWith("No user found with this uid.");
    expect(result.current.loading).toBe(false);
  });

  test("handleSave does nothing if no user is found", async () => {
    // Arrange
    useCurrentUser.mockReturnValue(null);

    // Act
    const { result } = renderHook(() => useRaceForm());

    await act(async () => {
      await result.current.handleSave();
    });

    // Assert
    expect(mockSaveRace).not.toHaveBeenCalled();
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  test("handleSave handles errors", async () => {
    // Arrange
    useCurrentUser.mockReturnValue({ uid: "12345" });
    mockSaveRace.mockRejectedValue(new Error("Something went wrong"));

    // Act
    const { result } = renderHook(() => useRaceForm());

    await act(async () => {
      await result.current.handleSave();
    });

    // Assert
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error saving data",
      "Something went wrong"
    );
    expect(result.current.loading).toBe(false);
  });
});
