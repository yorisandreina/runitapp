import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Custom hook to fetch achievements for a specific user.
 *
 * This hook fetches a user's achievements from the Firestore collection 
 * `usersCompletedRaces` based on the provided `userId`. It returns the 
 * achievements and the loading state.
 *
 * @param {string} userId - The unique identifier for the user whose achievements to fetch.
 * @returns {Object} - An object containing:
 *   - `achievements` (Array): A list of achievements, each with `id` and data fields.
 *   - `loading` (boolean): A loading state indicating whether the achievements are being fetched.
 */
const useFetchAchievements = (userId) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const getAchievements = async () => {
        setLoading(true);
        try {
          const q = query(
            collection(db, "usersCompletedRaces"),
            where("uid", "==", userId)
          );

          const achievementsQuerySnapshot = await getDocs(q);

          const fetchedAchievements = achievementsQuerySnapshot.docs.map(
            (doc) => ({
              ...doc.data(),
              id: doc.id,
            })
          );

          setAchievements(fetchedAchievements);
        } catch (error) {
          console.error("Error fetching achievements:", error);
        } finally {
          setLoading(false);
        }
      };
      getAchievements();
    }
  }, [userId]);

  return { achievements, loading };
};

export default useFetchAchievements;