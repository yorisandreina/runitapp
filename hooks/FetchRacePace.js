import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import useCurrentUser from "../hooks/UserData";

/**
 * Custom hook to fetch the current user's race pace from Firestore.
 *
 * This hook listens for changes to the `racePace` field in the user's document 
 * in Firestore and updates the state whenever a change occurs. It returns the 
 * race pace as a string.
 *
 * @returns {string} - The race pace of the current user as a string.
 */
const useFetchRacePace = () => {
  const [racePace, setRacePace] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      if (doc.exists()) {
        const pace = doc.data().racePace;
        setRacePace(pace.toString());
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  return racePace;
};

export default useFetchRacePace;
