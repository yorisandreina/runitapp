import admin from "firebase-admin";
import {
  initializeTestEnvironment,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import * as path from "path";

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
    const serviceAccountPath = path.resolve(
      __dirname,
      "../credentials/ServiceAccount.json"
    );
    
    admin.initializeApp({ credential: admin.credential.cert(serviceAccountPath), projectId: "runit-8e5c8" });
}

let testEnv;

beforeAll(async () => {
  // Initialize Firebase Test Environment
  testEnv = await initializeTestEnvironment({
    projectId: "runit-8e5c8",
    firestore: {
      host: "127.0.0.1",
      port: 8080,
    },
  });
});

afterAll(async () => {
  // Cleanup the test environment
  await testEnv.cleanup();
});

test("should add a document to Firestore", async () => {
  const db = admin.firestore();

  // Arrange
  const docRef = db.collection("users").doc("user_123");

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    uid: "test-uid",
  };
  
  // Act
  await assertSucceeds(docRef.set(userData));

  const doc = await docRef.get();
  const data = doc.data();

  // Assert
  expect(doc.exists).toBe(true);
  expect(data).toEqual(userData);
});
