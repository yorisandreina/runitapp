import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

/**
 * Custom hook to fetch user data from Firestore when the screen is focused.
 *
 * This hook listens for the screen focus event using the provided `navigation` object.
 * When the screen is focused, it fetches the current user's data from the `users` collection
 * in Firestore and updates the state with the user's data.
 *
 * @param {Object} navigation - The navigation object used to listen for screen focus.
 * @returns {Object|null} - The user data from Firestore, or null if the data is not available.
 */
const useFetchUserData = (navigation) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) setUserData(userDoc.data());
      }
    });

    return unsubscribe;
  }, [navigation]);

  return userData;
};

export default useFetchUserData;
