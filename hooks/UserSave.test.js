import { useSaveRace } from "./UserSave";
import {
  getDocs,
  setDoc,
  query,
  collection,
  where,
} from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  getDocs: jest.fn(),
  setDoc: jest.fn(),
  query: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  where: jest.fn(),
}));

describe("useSaveRace", () => {
  let db;
  let saveRace;

  beforeEach(() => {
    db = {};
    saveRace = useSaveRace(db).saveRace;

    collection.mockReturnValue("mockCollection");
    query.mockReturnValue("mockQuery");
    where.mockReturnValue("mockWhere");

    jest.clearAllMocks();
  });

  it('should return "success" when user is found and race data is saved', async () => {
    // Arrange
    const currentUser = { uid: "user123" };
    const raceData = { 
        raceName: "test race",
        raceDate: "2025-05-20",
        raceDistance: "42km",
        racePace: "05:20",
    };

    const mockUserSnapshot = {
      empty: false,
      docs: [{ id: "doc123" }],
    };

    // Act
    getDocs.mockResolvedValue(mockUserSnapshot);
    setDoc.mockResolvedValue("success");

    const result = await saveRace(currentUser, raceData);

    // Asert
    expect(result).toBe("success");
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(setDoc).toHaveBeenCalledTimes(1);

    expect(setDoc).toHaveBeenCalledWith(
      expect.objectContaining({}),
      raceData,
      { merge: true }
    );
  });

  it('should return "no_user" when no user is found', async () => {
    // Arrange
    const currentUser = { uid: "user123" };
    const raceData = {
      raceName: "test race",
      raceDate: "2025-05-20",
      raceDistance: "42km",
      racePace: "05:20",
    };

    const mockUserSnapshot = {
      empty: true,
    };

    // Act
    getDocs.mockResolvedValue(mockUserSnapshot);

    const result = await saveRace(currentUser, raceData);

    // Assert
    expect(result).toBe("no_user");
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(setDoc).not.toHaveBeenCalled();
  });

  it("should return undefined if no currentUser is provided", async () => {
    // Act
    const result = await saveRace(null, { race: "test race" });

    // Assert
    expect(result).toBeUndefined();
    expect(getDocs).not.toHaveBeenCalled();
    expect(setDoc).not.toHaveBeenCalled();
  });
});