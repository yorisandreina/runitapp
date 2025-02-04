import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const useSaveRace = (db) => {
  const saveRace = async (currentUser, raceData) => {
    if (!currentUser) return;

    const userRef = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(userRef);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      const userDocRef = doc(db, "users", docId);

      await setDoc(userDocRef, raceData, { merge: true });
      return "success";
    }
    return "no_user";
  };

  return { saveRace };
};
