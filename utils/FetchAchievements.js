import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

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