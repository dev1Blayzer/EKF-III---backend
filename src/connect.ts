import * as admin from "firebase-admin";
import * as fireorm from "fireorm";
import env from "./env";

export default function connect() {
  if (admin.apps.length !== 0) {
    return admin.firestore();
  }
  if (
    process &&
    process.env &&
    (process.env.FIREBASE_CONFIG || process.env.GOOGLE_CLOUD_PROJECT)
  ) {
    admin.initializeApp();
  } else {
    const serviceAccount = require("../service-account.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
      storageBucket: `${serviceAccount.project_id}.appspot.com`
    });
  }

  const firestore = admin.firestore();
  if (env("firestore.emulate", false)) {
    firestore.settings({
      host: env("firestore.host", "localhost:8080"),
      ssl: !!env("firestore.ssl")
    });
  }
  fireorm.initialize(firestore);

  return firestore;
}
