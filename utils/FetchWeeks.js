import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const useFetchWeeks = (userData) => {
  const [weeks, setWeeks] = useState([]);
  const [weeksUntilRace, setWeeksUntilRace] = useState("");
  const [trainingType, setTrainingType] = useState("");

  useEffect(() => {
    if (!userData) return;

    const collectionName =
      userData.raceDistance === "21km"
        ? "halfMarathonTraining"
        : "marathonTraining";

    setTrainingType(
      collectionName === "marathonTraining"
        ? "Marathon Training"
        : "Half Marathon Training"
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
