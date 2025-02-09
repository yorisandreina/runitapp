import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";

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
