import { useState, useEffect } from "react";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Custom hook to fetch and filter workouts based on the selected week.
 *
 * This hook listens for updates to the "marathonTraining" collection in Firestore and filters
 * the workouts based on the selected week. It returns an array of workouts for the selected week 
 * along with a loading state to indicate if the data is still being fetched.
 *
 * @param {string} selectedWeek - The week for which to fetch workouts (e.g., "week 1", "week 2").
 * @returns {Object} - An object containing:
 *   - `workouts` (Array): An array of workout objects for the selected week. Each workout includes the `id` and other data from Firestore.
 *   - `loading` (boolean): A flag indicating whether the data is still being loaded from Firestore.
 */
const useFetchWorkouts = (selectedWeek) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "marathonTraining"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const workoutsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredWorkouts = workoutsArray.filter(
        (workout) => workout.week === selectedWeek
      );

      setWorkouts(filteredWorkouts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedWeek]);

  return { workouts, loading };
};

export default useFetchWorkouts;
