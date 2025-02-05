import { initializeTestApp, clearFirestoreData } from "@firebase/testing";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const projectId = "your-project-id";

beforeEach(async () => {
  // Initialize the Firebase app for testing
  const app = await initializeTestApp({
    projectId,
    auth: { uid: "test-user" },
  });
  const db = getFirestore(app);

  // Connect to the Firestore emulator
  connectFirestoreEmulator(db, "localhost", 8080);
});

afterEach(async () => {
  // Clear Firestore data after each test
  await clearFirestoreData({ projectId });
});

test("add a document to Firestore", async () => {
  const db = getFirestore();
  const testCollection = collection(db, "test-collection");

  // Add a document
  await addDoc(testCollection, { name: "Test Document" });

  // Fetch documents
  const querySnapshot = await getDocs(testCollection);
  const documents = querySnapshot.docs.map((doc) => doc.data());

  // Assert
  expect(documents).toHaveLength(1);
  expect(documents[0].name).toBe("Test Document");
});
