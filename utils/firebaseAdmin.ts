import * as admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY || "{}");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestore = admin.firestore();

export const verifyIdToken = async (token: string) => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (err) {
    console.error("Error verifying token:", err);
    throw new Error("Unauthorized");
  }
};

