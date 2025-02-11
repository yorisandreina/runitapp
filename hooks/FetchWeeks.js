import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Custom hook to fetch weekly training data based on user data.
 *
 * This hook fetches weekly training data from Firestore based on the user's race distance 
 * (either marathon or half marathon). It also calculates the number of weeks remaining 
 * until the user's race date and sets the appropriate training type (5km, 10km, Marathon or Half Marathon).
 *
 * @param {Object|null} userData - The user data containing race distance and race date.
 * @returns {Object} - An object containing:
 *   - `weeks` (Array): An array of weekly training data with each week having an `id` and `week` number.
 *   - `weeksUntilRace` (string): The number of weeks remaining until the user's race, calculated from the current date.
 *   - `trainingType` (string): A string describing the type of training.
 */
const useFetchWeeks = (userData) => {
  const [weeks, setWeeks] = useState([]);
  const [weeksUntilRace, setWeeksUntilRace] = useState("");
  const [trainingType, setTrainingType] = useState("");

  useEffect(() => {
    if (!userData) return;

    const collectionName =
      userData.raceDistance === "21km"
        ? "halfMarathonTraining"
        : userData.raceDistance === "10km"
        ? "tenKmTraining"
        : userData.raceDistance === "5km"
        ? "fiveKmTraining"
        : "marathonTraining";

    setTrainingType(
      collectionName === "marathonTraining"
        ? "Marathon Training"
        : collectionName === "halfMarathonTraining"
        ? "Half Marathon Training"
        : collectionName === "tenKmTraining"
        ? "10km Race Training"
        : "5km Race Training"
    );

    const q = query(collection(db, collectionName), where("week", "!=", ""));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const weeksArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        week: doc.data().week,
      }));
      weeksArray.sort((a, b) => b.week - a.week);
      setWeeks(weeksArray);
    });

    if (userData) {
      const currentDate = new Date();
      const daysUntilRace =
        (new Date(userData.raceDate) - currentDate) / (1000 * 60 * 60 * 24);
      setWeeksUntilRace(Math.ceil(daysUntilRace / 7));
    }

    return () => unsubscribe();
  }, [userData]);

  return { weeks, weeksUntilRace, trainingType };
};

export default useFetchWeeks;
