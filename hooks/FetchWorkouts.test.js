import { renderHook, act } from "@testing-library/react-native";
import { onSnapshot } from "firebase/firestore";
import useFetchWorkouts from "./FetchWorkouts";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  onSnapshot: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
  initializeApp: jest.fn(),
}));

describe("useFetchWorkouts Hook", () => {
  const mockSelectedWeek = 2;
  const mockWorkouts = [
    { id: "1", week: 1, name: "Workout 1" },
    { id: "2", week: 2, name: "Workout 2" },
    { id: "3", week: 2, name: "Workout 3" },
    { id: "4", week: 3, name: "Workout 4" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return workouts filtered by selectedWeek and set loading to false", async () => {
    // Arrange
    const unsubscribe = jest.fn();

    onSnapshot.mockImplementation((q, callback) => {
      callback({
        docs: mockWorkouts.map((doc) => ({
          id: doc.id,
          data: () => ({ week: doc.week, name: doc.name }),
        })),
      });
      return unsubscribe;
    });

    // Act
    const { result } = renderHook(() =>
      useFetchWorkouts(mockSelectedWeek)
    );

    await act(async () => {});

    // Assert
    expect(result.current.workouts).toEqual([
      { id: "2", week: 2, name: "Workout 2" },
      { id: "3", week: 2, name: "Workout 3" },
    ]);

    expect(result.current.loading).toBe(false);
  });

  it("should return an empty array if no workouts match selectedWeek", async () => {
    // Arrange
    const unsubscribe = jest.fn();

    onSnapshot.mockImplementation((q, callback) => {
      callback({
        docs: [],
      });
      return unsubscribe;
    });

    // Act
    const { result } = renderHook(() =>
      useFetchWorkouts(10)
    );

    await act(async () => {});

    // Assert
    expect(result.current.workouts).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});
