import { renderHook, act } from "@testing-library/react-native";
import { getDocs } from "firebase/firestore";
import useFetchAchievements from "./FetchAchievements";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
  initializeApp: jest.fn(),
}));

describe("useFetchAchievements", () => {
  const mockUserId = "test-user-id";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with loading state", async () => {
    // Arrange
    const { result } = renderHook(() => useFetchAchievements(mockUserId));

    // Assert
    expect(result.current.loading).toBe(true);
    expect(result.current.achievements).toEqual([]);
  });

  it("should fetch and return achievements", async () => {
    // Arrange
    const mockAchievements = [
      { id: "1", raceName: "Race 1", raceDistance: "5K" },
      { id: "2", raceName: "Race 2", raceDistance: "10K" },
    ];

    // Act
    getDocs.mockResolvedValue({
      docs: mockAchievements.map((doc) => ({
        id: doc.id,
        data: () => doc,
      })),
    });

    const { result } = renderHook(() =>
      useFetchAchievements(mockUserId)
    );

    await act(async () => {});

    // Assert
    expect(result.current.loading).toBe(false);
    expect(result.current.achievements).toEqual(mockAchievements);
  });

  it("should handle errors correctly", async () => {
    // Arrange
    getDocs.mockRejectedValue(new Error("Firestore error"));

    // Act
    const { result } = renderHook(() =>
      useFetchAchievements(mockUserId)
    );

    await act(async () => {});

    // Assert
    expect(result.current.loading).toBe(false);
    expect(result.current.achievements).toEqual([]);
  });

  it("should not fetch achievements when userId is null", async () => {
    // Arrange
    const { result } = renderHook(() => useFetchAchievements(null));

    // Assert
    expect(result.current.loading).toBe(true);
    expect(result.current.achievements).toEqual([]);
    expect(getDocs).not.toHaveBeenCalled();
  });
});
