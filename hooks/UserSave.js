import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

/**
 * Custom hook to save race data to the Firestore database.
 *
 * This hook provides a `saveRace` function that allows you to save race-related data 
 * for the current user in the Firestore database. It ensures the user exists in the database 
 * based on the provided `currentUser` and their `uid`. If the user exists, the race data 
 * is merged with their document; otherwise, it returns an error message.
 *
 * @param {Object} db - Firestore database instance.
 *   - The `db` instance should be initialized with Firebase's Firestore configuration.
 * @returns {Object} An object containing the `saveRace` function.
 *   - `saveRace(currentUser, raceData)` - A function to save the race data for the given user.
 *     - `currentUser` {Object} - The current authenticated user object.
 *       - `uid` {string} - The unique identifier of the current user.
 *     - `raceData` {Object} - The data to be saved in the Firestore database for the race.
 *       - `raceName` {string} - The name of the race.
 *       - `raceDate` {string} - The date of the race in ISO format.
 *       - `raceDistance` {string} - The distance of the race (e.g., "5km", "10km").
 *       - `racePace` {string} - The pace of the race (e.g., "5:00" for 5 minutes per kilometer).
 *
 * @returns {Promise<string>} A promise that resolves to "success" if the race data was saved
 * successfully, or "no_user" if the user was not found in the database.
 */
export const useSaveRace = (db) => {
  const saveRace = async (currentUser, raceData) => {
    if (!currentUser) return;

    const userRef = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(userRef);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      const userDocRef = doc(db, "users", docId);

      await setDoc(userDocRef, raceData, { merge: true });
      return "success";
    }
    return "no_user";
  };

  return { saveRace };
};
