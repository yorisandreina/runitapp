import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(app); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return currentUser;
};

export default useCurrentUser;
