import admin from "firebase-admin";
import serviceAccount from "../secret.json";

export const verifyIdToken = async (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: "https://bugsbyte-3a305.firebaseio.com",
    });
  }

  try {
    return admin.auth().verifyIdToken(token);
  } catch (error) {
    throw error;
  }
};
