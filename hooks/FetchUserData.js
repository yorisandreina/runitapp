import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

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
