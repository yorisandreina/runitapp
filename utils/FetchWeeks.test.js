import { renderHook, act } from "@testing-library/react-native";
import useFetchWeeks from "./FetchWeeks";
import { onSnapshot } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
  initializeApp: jest.fn(),
}));

describe("useFetchWeeks", () => {
  const mockUserData = {
    raceDistance: "21km",
    raceDate: "2025-03-01",
  };

  it("should return default values when userData is null", () => {
    // Arrange
    const { result } = renderHook(() => useFetchWeeks(null));

    // Assert
    expect(result.current.weeks).toEqual([]);
    expect(result.current.weeksUntilRace).toBe("");
    expect(result.current.trainingType).toBe("");
  });

  it("should return the correct weeks and training type when userData is provided", async () => {
    // Arrange
    const fakeData = [
      { id: "2", data: () => ({ week: 2 }) },
      { id: "1", data: () => ({ week: 1 }) },
    ];
    onSnapshot.mockImplementationOnce((q, callback) => {
      callback({
        docs: fakeData,
      });
      return jest.fn();
    });

    // Act
    const { result } = renderHook(() =>
      useFetchWeeks(mockUserData)
    );

    await act(async () => {
    });

    // Assert
    expect(result.current.trainingType).toBe("Half Marathon Training");
    expect(result.current.weeks).toEqual([
      { id: "2", week: 2 },
      { id: "1", week: 1 },
    ]);

    const currentDate = new Date();
    const daysUntilRace =
      (new Date(mockUserData.raceDate) - currentDate) / (1000 * 60 * 60 * 24);
    expect(result.current.weeksUntilRace).toBe(Math.ceil(daysUntilRace / 7));
  });
});
