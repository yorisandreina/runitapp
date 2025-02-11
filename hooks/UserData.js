import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";

/**
 * Custom hook that tracks the current authenticated user.
 *
 * This hook listens for changes in the authentication state and updates the `currentUser` state
 * with the authenticated user object whenever a user logs in or logs out. It ensures that the user
 * is only updated if a new user is authenticated, and avoids unnecessary updates when the current user
 * remains the same.
 *
 * @returns {Object} The current authenticated user object.
 *   - `uid` (string): Unique identifier for the authenticated user.
 *   - `email` (string): Email of the authenticated user.
 *   - `displayName` (string): Display name of the authenticated user.
 */
const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(app); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user && user.uid !== currentUser?.uid) {
        setCurrentUser(user);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  return currentUser;
};

export default useCurrentUser;
