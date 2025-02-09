import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import useCurrentUser from "../hooks/UserData";

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
