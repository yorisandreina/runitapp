import { useState, useEffect } from "react";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

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
